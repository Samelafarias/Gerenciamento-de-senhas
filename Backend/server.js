const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";

const io = new Server(server, {
  cors: {
    origin: frontendURL,
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 4000;

// LÓGICA PRINCIPAL:
// arrays em memória que controlam o estado da fila em tempo real.
let filaDeAtendimento = [];
let atendimentosFinalizados = [];

// ouve por novas conexões de clientes. Toda a lógica de tempo real acontece aqui dentro.
io.on('connection', (socket) => {
  console.log(`Usuário conectado: ${socket.id}`);

    // ao conectar, o novo cliente recebe o estado atual da fila e dos finalizados.
  socket.emit('fila-inicial', filaDeAtendimento);
  socket.emit('finalizados-inicial', atendimentosFinalizados);

   // recebe um novo atendimento do cliente, adiciona a fila e notifica a todos.
  socket.on('gerar-novo-atendimento', (novoAtendimento) => {
    filaDeAtendimento.push(novoAtendimento);
    console.log('Novo atendimento adicionado:', novoAtendimento);
    io.emit('atualizar-fila', filaDeAtendimento);
  });

    // recebe um evento de chamada e retransmite para todos os clientes (painéis).
  socket.on('chamar-senha', (senhaChamada) => {
    console.log('Senha chamada no painel:', senhaChamada.senha);
    io.emit('nova-senha-chamada', senhaChamada);
  });

   // remove um atendimento da fila principal e o move para a lista de finalizados.
  socket.on('finalizar-atendimento', (atendimentoConcluido) => {

        // a fila é recriada sem o atendimento que foi finalizado.
    filaDeAtendimento = filaDeAtendimento.filter(at => at.id !== atendimentoConcluido.id);
    atendimentosFinalizados.push(atendimentoConcluido);
    console.log('Atendimento finalizado:', atendimentoConcluido);


     // notifica todos os clientes sobre as duas mudanças de estado.
    io.emit('atualizar-fila', filaDeAtendimento);
    io.emit('atualizar-finalizados', atendimentosFinalizados);
  });

  socket.on('disconnect', () => {
    console.log(`Usuário desconectado: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});