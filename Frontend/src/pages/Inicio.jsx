import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = `
  * {
    background-color: #F5F1F1;
    font-family: sans-serif; /* Adicionado para melhor legibilidade */
  }

  /* barra de navegação */
  .navbar {
    background: #0A4551;
    padding: 15px 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .inicio-logo {
    width: 110px;
    height: 40px;
    display: inline-block;
    background-color: white;
    -webkit-mask: url('./src/assets/logo.svg') no-repeat center / contain; /* Ajuste o caminho se necessário */
    mask: url('./src/assets/logo.svg') no-repeat center / contain; /* Ajuste o caminho se necessário */
    margin-right: auto;
  }

  .admin-btn {
    display: flex;
    align-items: center;
    gap: 14px;
    background: #00B4D8;
    color: #0A4551;
    border: 0;
    padding: 10px 26px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    transition: background 0.2s, transform 0.1s;
  }

  .admin-icon {
    width: 20px;
    height: 20px;
    display: inline-block;
    background-color: #0A4551;
    -webkit-mask: url('./src/assets/crown.svg') no-repeat center / contain;
    mask: url('./src/assets/crown.svg') no-repeat center / contain; 
  }

  .admin-btn:hover {
    background: #0192af;
  }

  /* body da página */
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 80px;
    text-align: center;
    flex: 1;
  }
  
  .inicio {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .main h2 {
    margin-bottom: 30px;
    color: #333; /* Cor adicionada para melhor contraste */
  }

  /* caixa que envolve os botões */
  .box {
    background: #0A4551;
    padding: 16px;
    border-radius: 10px;
    display: flex;
    gap: 15px;
    justify-content: center;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  /* botões grandes */
  .option-btn {
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 70px 70px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    transition: background 0.2s, transform 0.1s;
    width: 250px;
    color: #333; /* Cor adicionada para melhor contraste */
  }

  .option-btn:hover {
    background: #f0f0f0;
    transform: scale(1.02);
  }

  /* rodapé */
  .footer {
    background: #0A4551;
    padding: 10px;
  }
`;

// componente funcional que renderiza a página inicial.
function Inicio() {
    // inicializa o hook de navegação. A variável 'navigate' agora é uma função.
  const navigate = useNavigate();

   // MANIPULADORES DE EVENTOS (HANDLERS)

  // função chamada quando o botão "Administrador" é clicado.
  const handleAdminClick = () => {
       // redireciona o usuário para la rota '/Adm'.
    navigate('/Adm');
  };

  //  função chamada quando um dos botões de tipo de atendimento é clicado.
  const handleAtendimentoClick = (tipo) => {
     // ponto crucial da lógica: Salva o tipo de atendimento no localStorage do navegador.
    // a próxima tela (componente 'Dados') irá ler este valor para saber qual tipo de senha gerar.
    localStorage.setItem('tipoAtendimento', tipo);
    
        // após salvar a informação, redireciona o usuário para a rota '/dados', onde ele preencherá suas informações.
    navigate('/dados');
  };

  
  // RENDERIZAÇÃO DO COMPONENTE
  return (
    <>
      {}
      <style>{styles}</style>
      
      <div className="inicio">
        {/* barra de navegação */}
        <header className="navbar">
          <span className="inicio-logo"></span>
          <button className="admin-btn" onClick={handleAdminClick}>
            Administrador
            <span className="admin-icon"></span>
          </button>
        </header>

        {/* body da página */}
        <main className="main">
          <h2>Informe o tipo de atendimento</h2>

          <div className="box">
            <button 
              className="option-btn" 
              onClick={() => handleAtendimentoClick('Convencional')}
            >
              Convencional
            </button>
            <button 
              className="option-btn" 
              onClick={() => handleAtendimentoClick('Prioritário')}
            >
              Prioritário
            </button>
          </div>
        </main>

        {/* rodapé */}
        <footer className="footer"></footer>
      </div>
    </>
  );
}

export default Inicio;