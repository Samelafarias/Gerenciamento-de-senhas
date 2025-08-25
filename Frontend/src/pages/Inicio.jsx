import './Inicio.css';
import AdminIcon from '../assets/crown.png';

function Inicio() {
  return (
    <div className="inicio">
      {/* barra de navegação */}
      <header className="navbar">
        <button className="admin-btn">
        Administrador
        <img src={AdminIcon} alt="Admin" className="admin-icon" />
        </button>
      </header>

      {/* body da página */}
      <main className="main">
        <h2>Informe o tipo de atendimento</h2>

        <div className="box">
          <button className="option-btn">Convencional</button>
          <button className="option-btn">Prioritário</button>
        </div>
      </main>

      {/* rodapé */}
      <footer className="footer"></footer>
    </div>
  );
}

export default Inicio;
