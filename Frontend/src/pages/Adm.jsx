import './Adm.css';

function Adm() {
  return (
    <div className="adm-container">
      {/* barra de navegação */}
      <header className="adm-navbar">
        <span className="adm-logo-principal"></span>
        <button className="adm-btn">Gerar senha</button>
      </header>

      {/* body da página */}
      <main className="adm-main">

      {/* conteúdo do topo */}
          <h2 className="adm-subtitle">Próximo atendimento</h2>
        
        {/* conteúdo central */}
        <div className="adm-content">
          <div className="adm-card">
            <div className="adm-header">
              <span className="adm-logo"></span>
              <span className="adm-title">Ticket Gerado</span>
            </div>

            <div className="adm-info">
              <div className="adm-client">
                <span className="adm-client-name">Maria da Silva</span>
                <span className="adm-client-label">Cliente</span>
              </div>

              <div className="adm-password">
                <span className="adm-password-value">XXXXXXXX</span>
                <span className="adm-password-label">Senha</span>
              </div>

              <div className="adm-hour">
                <span className="adm-hour-value">00:00</span>
                <span className="adm-hour-label">Hora</span>
              </div>

              <div className="adm-id">
                <span className="adm-id-value">XXXXXXXXXXXXXXXXXXXX</span>
                <span className="adm-id-label">Id</span>
              </div>

              <div className="adm-sector">
                <span className="adm-sector-value">Guichê</span>
                <span className="adm-sector-label">Setor</span>
              </div>

              <div className="adm-type">
                <span className="adm-type-value">Convencional</span>
                <span className="adm-type-label">Tipo</span>
              </div>
            </div>
          </div>
        </div>

        {/* container para os botões no fim */}
        <div className="adm-bottom-actions">
          <div className="adm-left-actions">
            <button className="adm-next-btn">Chamar próxima senha</button>
            <button className="adm-attend-btn">Realizar atendimento</button>
          </div>

          <button className="adm-finish-btn">Gerar relatório diário</button>
          
        </div>

      </main>

      {/* rodapé */}
      <footer className="footer"></footer>
    </div>
  );
}

export default Adm;
