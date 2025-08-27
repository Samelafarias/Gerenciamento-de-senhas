import './Visor.css';

function Visor() {
  return (
    <div className="visor-container">
      {/* conteúdo central */}
      <div className="visor-content">
        {/* card principal */}
        <div className="visor-card">
          <div className="visor-info">

            {/* linha 1 do card */}
            <div className="visor-client">
              <span className="visor-client-name">Maria da Silva</span>
              <span className="visor-client-label">Cliente</span>
            </div>

            {/* espaço vazio pra alinhar o grid */}
            <div></div>

            {/* linha 2 do card */}
            <div className="visor-password">
              <span className="visor-password-value">XXXXXXXX</span>
              <span className="visor-password-label">Senha</span>
            </div>

            <div className="visor-sector">
              <span className="visor-sector-value">Guichê</span>
              <span className="visor-sector-label">Setor</span>
            </div>

            {/* linha 3 do card */}
            <div className="visor-hour">
              <span className="visor-hour-value">00:00</span>
              <span className="visor-hour-label">Hora</span>
            </div>

            <div className="visor-type">
              <span className="visor-type-value">Convencional</span>
              <span className="visor-type-label">Tipo</span>
            </div>
          </div>
        </div>

        {/* últimas senhas chamadas */}
         <div className="visor-last">
        <h3 className="visor-last-title">Últimas senhas chamadas</h3>
        <div className="visor-last-cards">
          <div className="visor-last-card">
            <span className="visor-client-name">Maria Silva</span>
            <span className="visor-client-label">Cliente</span>
            <span className="visor-password-value">XXXXXXXX</span>
            <span className="visor-password-label">Senha</span>
            <span className="visor-sector-value">Guichê</span>
            <span className="visor-type-value">Prioritário</span>
            <div className="visor-last-footer">
              <span>10:00</span>
              <span>01/01/2000</span>
            </div>
          </div>

          <div className="visor-last-card">
            <span className="visor-client-name">Maria Silva</span>
            <span className="visor-client-label">Cliente</span>
            <span className="visor-password-value">XXXXXXXX</span>
            <span className="visor-password-label">Senha</span>
            <span className="visor-sector-value">Guichê</span>
            <span className="visor-type-value">Prioritário</span>
            <div className="visor-last-footer">
              <span>10:00</span>
              <span>01/01/2000</span>
            </div>
          </div>

          <div className="visor-last-card">
            <span className="visor-client-name">Maria Silva</span>
            <span className="visor-client-label">Cliente</span>
            <span className="visor-password-value">XXXXXXXX</span>
            <span className="visor-password-label">Senha</span>
            <span className="visor-sector-value">Guichê</span>
            <span className="visor-type-value">Prioritário</span>
            <div className="visor-last-footer">
              <span>10:00</span>
              <span>01/01/2000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Visor;
