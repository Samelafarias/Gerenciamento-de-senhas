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

function Inicio() {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/Adm');
  };

  const handleAtendimentoClick = (tipo) => {
    localStorage.setItem('tipoAtendimento', tipo);
    
    navigate('/dados');
  };

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