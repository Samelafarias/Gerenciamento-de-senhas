import './Ticket.css';

function Ticket() {
  return (
    <div className="ticket-container">
      {/* barra de navegação */}
      <header className="ticket-navbar">
        <button className="ticket-btn">
          Administrador
          <span className="ticket-admin-icon"></span>
        </button>
      </header>

      {/* body da página */}
      <main className="ticket-main">
        {/* conteúdo central */}
        <div className="ticket-content">
          <div className="ticket-card">
            <div className="ticket-header">
              <div className="ticket-logo"></div>
              <span className="ticket-title">Ticket Gerado</span>
            </div>

            <div className="ticket-info">
              <div className="ticket-client">
                <span className="ticket-client-name">Maria da Silva</span>
                <span className="ticket-client-label">Cliente</span>
              </div>

              <div className="ticket-password">
                <span className="ticket-password-value">XXXXXXXX</span>
                <span className="ticket-password-label">Senha</span>
              </div>

              <div className="ticket-hour">
                <span className="ticket-hour-value">00:00</span>
                <span className="ticket-hour-label">Hora</span>
              </div>

              <div className="ticket-id">
                <span className="ticket-id-value">XXXXXXXXXXXXXXXXXXXX</span>
                <span className="ticket-id-label">Id</span>
              </div>

              <div className="ticket-sector">
                <span className="ticket-sector-value">Guichê</span>
                <span className="ticket-sector-label">Setor</span>
              </div>

              <div className="ticket-type">
                <span className="ticket-type-value">Convencional</span>
                <span className="ticket-type-label">Tipo</span>
              </div>
            </div>
          </div>
        </div>

        {/* botão no fim */}
        <button className="ticket-finish-btn">Finalizar</button>
      </main>

      {/* rodapé */}
      <footer className="footer"></footer>
    </div>
  );
}

export default Ticket;
