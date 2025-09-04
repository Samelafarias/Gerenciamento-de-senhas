import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = `
  .ticket-body-scope * {
    font-family: sans-serif; /* Padrão de fonte */
  }

  .ticket-body-scope {
    background-color: #F5F1F1;
  }

  /* barra de navegação */
  .ticket-navbar {
    background: #0A4551;
    padding: 15px 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .ticket-logo-principal {
    width: 110px;
    height: 40px;
    display: inline-block;
    background-color: white;
    -webkit-mask: url('./src/assets/logo.svg') no-repeat center / contain;
    mask: url('./src/assets/logo.svg') no-repeat center / contain;
    margin-right: auto;
  }

  .ticket-btn {
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

  .ticket-admin-icon {
    width: 20px;
    height: 20px;
    display: inline-block;
    background-color: #0A4551;
    -webkit-mask: url('./src/assets/crown.svg') no-repeat center / contain;
    mask: url('./src/assets/crown.svg') no-repeat center / contain; 
  }

  .ticket-btn:hover {
    background: #0189a4;
  }

  /* body da página */
  .ticket-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    position: relative;
  }

  .ticket-back {
    position: absolute;
    top: 30px;
    left: 30px;
    width: 0;
    height: 0;
    border-top: 18px solid transparent;
    border-bottom: 18px solid transparent;
    border-right: 26px solid #0A4551;
    cursor: pointer;
    transition: border-right-color 0.2s;
  }

  .ticket-back:hover {
    border-right-color: #0189a4;
  }

  /* card */
  .ticket-card {
    background: #0A4551;
    border-radius: 10px;
    padding: 20px 30px;
    width: 50%;
    max-width: 1000px;
    min-width: 500px;
    min-height: 300px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.349);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  /* cabeçalho do card */
  .ticket-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .ticket-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .ticket-header {
    display: flex;
    align-items: center;
    margin-bottom: 50px;
    margin-top: -20px;
    background: #0A4551;
  }

  .ticket-logo {
    width: 50px;
    height: 50px;
    display: inline-block;
    background-color: white;
    -webkit-mask: url('./src/assets/logo-icone.svg') no-repeat center / contain;
    mask: url('./src/assets/logo-icone.svg') no-repeat center / contain;
    margin-right: 10px;
  }

  .ticket-title {
    font-weight: bold;
    font-size: 22px;
    background: #0A4551;
    color: #fff;
  }

  /* informações */
  .ticket-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 25px 15px; /* Aumentado o espaçamento vertical */
    margin-left: 20px;
    background: #0A4551;
  }
  
  /* Estilos compartilhados para os blocos de informação */
  .ticket-info > div {
    display: flex;
    flex-direction: column;
    background: #0A4551;
    color: #fff;
  }
  
  /* Estilos compartilhados para os valores e labels */
  .ticket-info span {
    background-color: transparent; /* Garante que os spans não sobreponham o fundo */
    color: #fff;
  }

  .ticket-info .value {
    font-weight: bold;
    font-size: 20px;
  }

  .ticket-info .label {
    font-size: 14px;
    opacity: 0.8;
  }

  /* botão finalizar */
  .ticket-finish-btn {
    margin-top: 40px; /* Aumentado espaçamento */
    align-self: flex-end; /* Alinha à direita do card */
    margin-right: 25%; /* Alinha com a borda direita do card */
    background: #00B4D8;
    color: #0A4551;
    border: none;
    padding: 12px 25px; /* Botão um pouco maior */
    border-radius: 6px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s;
  }

  .ticket-finish-btn:hover {
    background: #0189a4;
  }

  /* rodapé */
  .footer {
    padding: 10px;
    background-color: #0A4551
  }
`;

function Ticket() {
  const navigate = useNavigate();
  const [ticketData, setTicketData] = useState(null);

  useEffect(() => {

    const savedDataString = localStorage.getItem('ultimoAtendimentoGerado');

    if (savedDataString) {
      const parsedData = JSON.parse(savedDataString);

      
      setTicketData(parsedData);
    }
  }, []);

  const handleFinish = () => {
    navigate('/');
  };

  if (!ticketData) {
    return <div>Carregando informações do ticket...</div>;
  }

  return (
    <div className="ticket-body-scope">
      <style>{styles}</style>
      <div className="ticket-container">
        <header className="ticket-navbar">
          <span className="ticket-logo-principal"></span>
          <button className="ticket-btn" onClick={() => navigate('/Adm')}>
            Administrador
            <span className="ticket-admin-icon"></span>
          </button>
        </header>

        <main className="ticket-main">
          <div className="ticket-back" onClick={() => navigate(-1)}></div>

          <div className="ticket-content">
            <div className="ticket-card">
              <div className="ticket-header">
                <span className="ticket-logo"></span>
                <span className="ticket-title">Ticket Gerado</span>
              </div>

              <div className="ticket-info">
                <div className="ticket-client">
                  <span className="value">{ticketData.nome}</span>
                  <span className="label">Cliente</span>
                </div>
                <div className="ticket-password">
                  <span className="value">{ticketData.senha}</span>
                  <span className="label">Senha</span>
                </div>
                <div className="ticket-hour">
                  <span className="value">{ticketData.hora}</span>
                  <span className="label">Hora</span>
                </div>
                <div className="ticket-id">
                  <span className="value">{ticketData.id}</span>
                  <span className="label">Id</span>
                </div>
                <div className="ticket-sector">
                  <span className="value">{ticketData.setor}</span>
                  <span className="label">Setor</span>
                </div>
                <div className="ticket-type">
                  {/* CORREÇÃO: Usando 'tipo' que é a propriedade correta do objeto */}
                  <span className="value">{ticketData.tipo}</span>
                  <span className="label">Tipo</span>
                </div>
              </div>
            </div>
          </div>

          <button className="ticket-finish-btn" onClick={handleFinish}>
            Finalizar
          </button>
        </main>
        
        <footer className="footer"></footer>
      </div>
    </div>
  );
}

export default Ticket;