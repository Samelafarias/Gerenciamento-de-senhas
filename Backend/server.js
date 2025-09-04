const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 4000;
let filaDeAtendimento = [];
let atendimentosFinalizados = [];


io.on('connection', (socket) => {
  console.log(`Usuário conectado: ${socket.id}`);

  socket.emit('fila-inicial', filaDeAtendimento);
  socket.emit('finalizados-inicial', atendimentosFinalizados);

  socket.on('gerar-novo-atendimento', (novoAtendimento) => {

    filaDeAtendimento.push(novoAtendimento);
    console.log('Novo atendimento adicionado:', novoAtendimento);

    io.emit('atualizar-fila', filaDeAtendimento);
  });

  socket.on('finalizar-atendimento', (atendimentoConcluido) => {

    filaDeAtendimento = filaDeAtendimento.filter(at => at.id !== atendimentoConcluido.id);

    atendimentosFinalizados.push(atendimentoConcluido);
    console.log('Atendimento finalizado:', atendimentoConcluido);

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