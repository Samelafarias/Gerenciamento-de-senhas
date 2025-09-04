# ✨ Sistema de Gerenciamento de Senhas em Tempo Real

## 📜 Descrição do Projeto
Esse é um sistema completo para gerenciamento de filas por meio da geração de senhas de atendimento. Foi desenvolvido para operar em um ambiente que simula uma agência bancária, com interfaces distintas que atendem ao cliente(Totem), ao atendente (administrador) e ao publico em geral (visor). 

Esse foi um projeto construido com uma arquitetura cliente-servidor, utilizando Node.js no backend para fazer o gerenciamento do estado da aplicação via WebSockets e React no frontend para interfaces de usuário.

## 🚀 Demonstração ao Vivo
O sistema até o presente momentoesta funcionando apenas localhost, caso tenha curiosidade em ver como fuciona basta seguir o passo a passo abaixo. 

## 🌟 Funcionalidades Principais
- **Geração de senhas -** Nessa interface o usuário seleciona o tipo de atendimento (convencional ou prioritário), além disso ele irá inserir seus dados para que possam ser chamados.

- **Painel administrativo -** Visualização da fila de espera em tempo real. O atendente pode:
-Chamar o próximo cliente.
-Chamar novamente caso o cliente não apareça.
-Marcar o atendimento como "Não Compareceu".
-Finalizar o atendimento e chamar o próximo da fila.

- **Visor público -** Uma tela de visualização que mostra a última senha chamada e o histórico recente, atualizada instantaneamente assim que o administrador finaliza um atendimento.

- **Sincronização Multi-dispositivo -** Graças ao backend com Socket.IO, todas as telas (Totem, Admin, Visor) são sincronizadas em tempo real, mesmo em diferentes computadores ou redes.

- **Relatório diário -** Funcionalidade para o administrador gerar um resumo dos atendimentos do dia.

## 💻 Tecnologias Utilizadas
 **Frontend**
 - `React` (com `Vite`) 
 - `Socket.IO Client `para comunicação em tempo 
 - `React Router` para navegação entre páginas
 - `CSS` puro para estilização

 **Backend**
  - `Node.js`
  - `Express.js` para a estrutura do servidor
  - `Socket.IO` para a comunicação bidirecional com os clientes (WebSockets)
  - `CORS` para gerenciar permissões de acesso

 ## 🏗️ Arquitetura do Sistema
 O servidor Node.js atua como o ponto central, gerenciando a fila e o estado dos atendimentos. As interfaces React se conectam a ele para receber e enviar atualizações em tempo real.

 ## 🔧 Como Executar Localmente
 **Pré-requisitos**
 -`Node.js`(versão 18 ou superior)
 -`npm`

 **Instalação**
 1. Clone o repositório:

```bash
   #https://github.com/Samelafarias/Gerenciamento-de-senhas.git
```

 2. Configure o backend:
 
 ```bash
    cd Backend
    npm install
    npm run dev
 ```
O servisor do backend esta rodando no `http://localhost:4000`

 3. Configure o frontend
 Abra um novo terminal
 ```bash
    cd Frontend
    npm install
 ```
 Inicie a aplicação
 ```bash
    npm run dev
 ```
A aplicação frontend estará disponível em http://localhost:5173 (ou outra porta indicada pelo Vite).

 ## ☁️ Implantação (Deployment)
 Este projeto foi implantado utilizando a seguinte estratégia:

- O Backend Node.js esta funcionando localhost.
- O Frontend React esta funcionando localhost.



 ## 👨‍💻 Autor
 Feito por:

 - [Samela Farias](https://github.com/Samelafarias)
 - [Letícia Carvalho](https://github.com/leticiasilva09)
 - [Kaique do Vale](https://github.com/KaiqueVale)

 ## 📄 Licença
 
 