import './Dados.css';

function Dados() {
  return (
    <div className="dados-container">
      {/* barra de navegação */}
      <header className="dados-navbar">
        <span className="dados-logo"></span>
        <button className="dados-admin-btn">
        Administrador
        <span className="dados-admin-icon"></span>
        </button>
      </header>

      {/* body da página */}
      <main className="dados-main">
        <form className="dados-form">
          <div className="dados-form-group">
            <label htmlFor="nome">Nome do cliente:</label>
            <input
              type="text"
              id="nome"
              placeholder="Nome completo"
            />
          </div>

          <div className="dados-form-group">
            <label htmlFor="cpf">CPF do cliente:</label>
            <input
              type="text"
              id="cpf"
              placeholder="000.000.000-00"
            />
          </div>

          <div className="dados-form-group">
            <label htmlFor="atendimento">Ser atendido por:</label>
            <select id="atendimento">
              <option value=""></option>
              <option value="convencional">Atendente 01</option>
              <option value="prioritario">Atendente 02</option>
            </select>
          </div>

          <p className="dados-setor-label">Informe um setor para ser atendido:</p>

          <div className="dados-setores">
            <button type="button" className="dados-setor-btn">Guichê</button>
            <button type="button" className="dados-setor-btn">Caixa</button>
            <button type="button" className="dados-setor-btn">Gerência</button>
          </div>

          <button type="submit" className="dados-gerar-btn">Gerar senha</button>
        </form>
      </main>
    </div>
  );
}

export default Dados;
