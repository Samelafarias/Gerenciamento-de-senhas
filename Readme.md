# ✨ Sistema de Gerenciamento de Senhas em Tempo Real

## 📜 Descrição do Projeto
Esse é um sistema completo para gerenciamento de filas por meio da geração de senhas de atendimento. Foi desenvolvido para operar em um ambiente que simula uma agência bancária, com interfaces distintas que atendem ao cliente(Totem), ao atendente (administrador) e ao publico em geral (visor). 

Esse foi um projeto construido com uma arquitetura cliente-servidor, utilizando Node.js no backend para fazer o gerenciamento do estado da aplicação via WebSockets e React no frontend para interfaces de usuário.

## 🚀 Demonstração ao Vivo
O sistema até o presente momento esta funcionando apenas localhost, caso tenha curiosidade em ver como fuciona basta seguir o passo a passo abaixo. 

## 🌟 Funcionalidades Principais
- **Geração de senhas -** Nessa interface o usuário seleciona o tipo de atendimento (convencional ou prioritário), além disso ele irá inserir seus dados para que possam ser chamados.

- **Painel administrativo -** Visualização da fila de espera em tempo real. O atendente pode:
  
  - Chamar o próximo cliente.
  - Chamar novamente caso o cliente não apareça.
  - Marcar o atendimento como "Não Compareceu".
  - Finalizar o atendimento e chamar o próximo da fila.

- **Visor público com alerta sonoro-** A tela de visualização é atualizada imediatamente quando um atendente clica em "Realizar Atendimento", tocando um alerta sonoro para notificar os clientes. O histórico de senhas já finalizadas também é exibido.

- **Sincronização Multi-dispositivo -** Graças ao backend com Socket.IO, todas as telas (Totem, Admin, Visor) são sincronizadas em tempo real, mesmo em diferentes computadores ou redes.

- **Relatório diário para Dowloand-** O administrador pode gerar e baixar um relatório completo (.txt) dos atendimentos finalizados no dia, em vez de apenas visualizá-lo em um alerta.

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

---

## 🏗️ Arquitetura do Sistema (MVC Adaptado)

O projeto foi estruturado seguindo uma adaptação do padrão arquitetural **MVC (Model-View-Controller)**, distribuído entre o backend e o frontend para garantir uma separação clara de responsabilidades.

* **Model (Modelo):** A responsabilidade do Modelo é gerenciar os dados e a lógica de negócio. Em nossa aplicação, essa camada reside no **servidor Node.js**. As variáveis que armazenam a `filaDeAtendimento` e os `atendimentosFinalizados` atuam como nosso "banco de dados" em memória, representando o estado e a estrutura dos dados.

* **View (Visão):** A camada de Visão é responsável por toda a interface com o usuário (UI). No nosso projeto, ela é inteiramente construída com **React**. Cada componente (`Adm.jsx`, `Visor.jsx`, `Dados.jsx`) funciona como uma "View", renderizando os dados recebidos do servidor de forma interativa e amigável.

* **Controller (Controlador):** O Controlador atua como o intermediário entre o Modelo e a Visão. Em nossa arquitetura, essa função é dividida:
    * No **backend**, os listeners do **Socket.IO** (`io.on('connection', ...)`) funcionam como o principal Controlador. Eles recebem eventos das Views (ex: `gerar-novo-atendimento`), manipulam o Modelo (adicionando um item à fila) e notificam as Views sobre as mudanças.
    * No **frontend**, as funções de manipulação de eventos (ex: `handleSubmit`, `finalizarAtendimento`) em cada componente também podem ser vistas como pequenos Controladores, que capturam as interações do usuário e as enviam para o Controlador principal no servidor.


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
 Esse projeto foi feito com fins academicos.
 
