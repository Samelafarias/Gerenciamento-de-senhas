import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../socket';

const styles = `
  .dados-body * { /* Aplicando estilos globais apenas dentro deste escopo */
    background-color: #F5F1F1;
    color: #0A4551;
    font-family: sans-serif;
  }

  /* barra de navegação */
  .dados-navbar {
    background: #0A4551;
    padding: 15px 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .dados-logo {
    width: 110px;
    height: 40px;
    display: inline-block;
    background-color: white;
    -webkit-mask: url('./src/assets/logo.svg') no-repeat center / contain;
    mask: url('./src/assets/logo.svg') no-repeat center / contain;
    margin-right: auto;
  }

  .dados-admin-btn {
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

  .dados-admin-icon {
    width: 20px;
    height: 20px;
    display: inline-block;
    background-color: #0A4551;
    -webkit-mask: url('./src/assets/crown.svg') no-repeat center / contain;
    mask: url('./src/assets/crown.svg') no-repeat center / contain;
  }

  .dados-admin-btn:hover {
    background: #0199b7;
  }

  /* body da página */
  .dados-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .dados-main {
    flex: 1;
    display: flex;
    justify-content: center;
    margin-top: 60px;
  }

  .dados-back {
    position: absolute;
    top: 100px;
    left: 30px;
    width: 0;
    height: 0;
    border-top: 18px solid transparent;
    border-bottom: 18px solid transparent;
    border-right: 26px solid #0A4551;
    cursor: pointer;
    transition: border-right-color 0.2s;
  }

  .dados-back:hover {
    border-right-color: #0189a4;
  }

  /* formulário */
  .dados-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 900px;
  }

  /* grupo de inputs */
  .dados-form-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    text-align: left;
    font-size: 16px;
  }

  .dados-form-group label {
    width: 150px;
    font-weight: bold;
  }

  .dados-form-group input,
  .dados-form-group select {
    flex: 1;
    padding: 10px;
    border: 0;
    border-radius: 6px;
    font-size: 14px;
    background-color: #fff;
    box-shadow:0 2px 4px rgba(0, 0, 0, 0.349);
  }

  .dados-form-group input:focus,
  .dados-form-group select:focus {
    outline: none;
    border-color: #999;
    box-shadow: none;
  }

  .dados-form-group input::placeholder,
  .dados-form-group select::placeholder {
    color: #6b6b6b;
    opacity: 1;
  }

  /* setor */
  .dados-setor-label {
    margin-top: 2vh;
    font-weight: bold;
    text-align: left;
  }

  .dados-setores {
    display: flex;
    gap: 50px;
    justify-content: center;
  }

  .dados-setor-btn {
    background: #0A4551;
    color: #fff;
    border: 0;
    padding: 20px 45px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.349);
    transition: background 0.2s, transform 0.1s;
  }
  
  .dados-setor-btn.selected { /* Estilo para o botão de setor selecionado */
    background: #00B4D8;
    transform: scale(1.05);
  }

  .dados-setor-btn:hover {
    background: #0199b7;
  }

  /* botão gerar senha */
  .dados-gerar-btn {
    margin-top: 15vh;
    align-self: flex-end;
    background: #00B4D8;
    color: #0A4551;
    border: 0;
    padding: 10px 30px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background 0.2s;
  }

  .dados-gerar-btn:hover {
    background: #0199b7;
  }
`;

const getChaveDoDia = () => {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0'); 
  const dia = String(hoje.getDate()).padStart(2, '0');
  return `atendimentos_${ano}-${mes}-${dia}`;
};

function Dados() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    setor: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSetorClick = (setor) => {
    setFormData(prevState => ({
      ...prevState,
      setor: setor
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.setor) {
      alert('Por favor, selecione um setor para ser atendido.');
      return;
    }

    const tipoAtendimento = localStorage.getItem('tipoAtendimento') || 'Não definido';

    const timestamp = Date.now();
    const senhaLetra = tipoAtendimento === 'Prioritário' ? 'P' : 'C';
    const senhaNumero = String(timestamp).slice(-4); 

    const dadosCompletos = {
      id: formData.cpf || `${senhaLetra}-${timestamp}`, 
      nome: formData.nome,
      cpf: formData.cpf,
      setor: formData.setor,
      tipo: tipoAtendimento,
      hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      senha: `${senhaLetra}${senhaNumero}`,
      dataHora: new Date().toISOString()
    };

    socket.emit('gerar-novo-atendimento', dadosCompletos);

    localStorage.setItem('ultimoAtendimentoGerado', JSON.stringify(dadosCompletos));
    
    navigate('/ticket'); 
  };

  return (
    <div className='dados-body'>
      <style>{styles}</style>
      <div className="dados-container">
        {/* barra de navegação */}
        <header className="dados-navbar">
          <span className="dados-logo"></span>
          <button className="dados-admin-btn" onClick={() => navigate('/Adm')}>
            Administrador
            <span className="dados-admin-icon"></span>
          </button>
        </header>

        {/* body da página */}
        <main className="dados-main">
          {/* Seta de voltar agora usa o navigate */}
          <div className="dados-back" onClick={() => navigate(-1)}></div>

          <form className="dados-form" onSubmit={handleSubmit}>
            <div className="dados-form-group">
              <label htmlFor="nome">Nome do cliente:</label>
              <input
                type="text"
                id="nome"
                name="nome" 
                placeholder="Nome completo"
                value={formData.nome} 
                onChange={handleChange} 
                required
              />
            </div>

            <div className="dados-form-group">
              <label htmlFor="cpf">CPF do cliente:</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={handleChange}
                required
              />
            </div>

           
           
            <p className="dados-setor-label">Informe um setor para ser atendido:</p>

            <div className="dados-setores">
              <button 
                type="button" 
                className={`dados-setor-btn ${formData.setor === 'Guichê' ? 'selected' : ''}`}
                onClick={() => handleSetorClick('Guichê')}
              >
                Guichê
              </button>
              <button 
                type="button" 
                className={`dados-setor-btn ${formData.setor === 'Caixa' ? 'selected' : ''}`}
                onClick={() => handleSetorClick('Caixa')}
              >
                Caixa
              </button>
              <button 
                type="button" 
                className={`dados-setor-btn ${formData.setor === 'Gerência' ? 'selected' : ''}`}
                onClick={() => handleSetorClick('Gerência')}
              >
                Gerência
              </button>
            </div>

            <button type="submit" className="dados-gerar-btn">Gerar senha</button>
          </form>
        </main>
      </div>
    </div>
  );
}

export default Dados;