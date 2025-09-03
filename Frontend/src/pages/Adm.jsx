import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Estilos (sem alterações)
const styles = `
* {
    background-color: #F5F1F1;
    font-family: sans-serif;
  }

  /* barra de navegação */
  .adm-navbar {
    background: #0A4551;
    padding: 15px 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .adm-logo-principal {
    width: 110px;
    height: 40px;
    display: inline-block;
    background-color: white;
    -webkit-mask: url('./src/assets/logo.svg') no-repeat center / contain;
    mask: url('./src/assets/logo.svg') no-repeat center / contain;
    margin-right: auto;
  }

  .adm-btn {
    display: flex;
    align-items: center;
    gap: 14px;
    background: #00B4D8;
    color: #000;
    border: 0;
    padding: 10px 50px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    transition: background 0.2s, transform 0.1s;
  }

  .adm-btn:hover {
    background: #0190ac;
  }

  /* body da página */
  .adm-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 40px 20px;
  }

  /* card */
  .adm-card {
    background: #0A4551;
    border-radius: 10px;
    padding: 20px 30px;
    width: 50%;
    max-width: 1000px;
    min-width: 500px;
    min-height: 300px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.349);
    justify-content: space-between;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  /* cabeçalho do card */
  .adm-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .adm-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin-top: 20px;
  }

  .adm-subtitle {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    width: 100%;
    max-width: 1000px;
    min-width: 500px;
    padding: 0 20px;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
  }

  .adm-header {
    display: flex;
    align-items: center;
    margin-bottom: 50px;
    margin-top: -20px;
    background: #0A4551;
  }

  .adm-logo {
    width: 50px;
    height: 50px;
    display: inline-block;
    background-color: white;
    -webkit-mask: url('./src/assets/logo-icone.svg') no-repeat center / contain;
    mask: url('./src/assets/logo-icone.svg') no-repeat center / contain;
    margin-right: 10px;
  }

  .adm-title {
    font-weight: bold;
    font-size: 22px;
    background: #0A4551;
    color: #fff;
  }

  /* informações */
  .adm-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-left: 20px;
    background: #0A4551;
  }

  .adm-client, .adm-password, .adm-hour, .adm-id, .adm-sector, .adm-type {
    display: flex;
    flex-direction: column;
    background: #0A4551;
  }
  
  .adm-client-name, .adm-password-value, .adm-hour-value, .adm-id-value, .adm-sector-value, .adm-type-value {
    font-weight: bold;
    font-size: 20px;
    background: #0A4551;
    color: #fff;
  }

  .adm-client-label, .adm-password-label, .adm-hour-label, .adm-id-label, .adm-sector-label, .adm-type-label {
    font-size: 14px;
    color: #fff;
    background: #0A4551;
  }

  .adm-bottom-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    max-width: 1000px;
    min-width: 500px;
    margin: 20px auto 12px;
    padding: 0 20px;
  }

  .adm-left-actions {
    display: flex;
    color: #fff;
    gap: 12px;
  }

  .adm-next-btn, .adm-attend-btn, .adm-finish-btn {
      color: #fff;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.3s, opacity 0.3s;
  }

  .adm-next-btn { background: #ff070e; }
  .adm-next-btn:hover { background: #cc0000; }
  .adm-attend-btn { background: #0bda23; }
  .adm-attend-btn:hover { background: #009900; }
  .adm-finish-btn { background: #00B4D8; padding: 10px 40px; }
  .adm-finish-btn:hover { background: #0190ac; }

  button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
  }

  .footer {
    background: #0A4551;
    padding: 10px;
    margin-top: auto; /* Empurra o rodapé para o fim */
  }
`;

// Dados de exemplo caso o localStorage esteja vazio
const DADOS_INICIAIS = [
    { id: 'uuid-1', nome: 'Maria da Silva', senha: 'P001', hora: '10:30', setor: 'Guichê 1', tipo: 'Prioritário' },
    { id: 'uuid-2', nome: 'João Pereira', senha: 'C002', hora: '10:32', setor: 'Guichê 2', tipo: 'Convencional' },
    { id: 'uuid-3', nome: 'Ana Costa', senha: 'C003', hora: '10:35', setor: 'Guichê 1', tipo: 'Convencional' },
];

const TEMPO_ESPERA = 5000; // 30 segundos em milissegundos

function Adm() {
  const navigate = useNavigate();
  const timerRef = useRef(null);

  // --- ESTADO DA APLICAÇÃO ---

  // Tenta carregar a fila do localStorage ou usa os dados iniciais
  const [filaDeSenhas, setFilaDeSenhas] = useState(() => {
    try {
      const filaSalva = localStorage.getItem('filaDeSenhas');
      return filaSalva ? JSON.parse(filaSalva) : DADOS_INICIAIS;
    } catch (error) {
      return DADOS_INICIAIS;
    }
  });

  // Tenta carregar os atendimentos finalizados do localStorage
  const [atendimentosFinalizados, setAtendimentosFinalizados] = useState(() => {
    try {
      const finalizadosSalvos = localStorage.getItem('atendimentosFinalizados');
      return finalizadosSalvos ? JSON.parse(finalizadosSalvos) : [];
    } catch (error) {
      return [];
    }
  });
  
  const [atendimentoEmAndamento, setAtendimentoEmAndamento] = useState(false);
  // Novo estado para controlar o fluxo de chamada com timeout
  const [chamadaStatus, setChamadaStatus] = useState('idle'); // 'idle', 'chamando_1', 'expirado_1', 'chamando_2', 'expirado_2'

  const senhaAtual = filaDeSenhas.length > 0 ? filaDeSenhas[0] : null;

  // --- EFEITOS PARA PERSISTÊNCIA DE DADOS ---

  // Salva a fila no localStorage sempre que ela mudar
  useEffect(() => {
    localStorage.setItem('filaDeSenhas', JSON.stringify(filaDeSenhas));
  }, [filaDeSenhas]);

  // Salva os atendimentos finalizados no localStorage sempre que a lista mudar
  useEffect(() => {
    localStorage.setItem('atendimentosFinalizados', JSON.stringify(atendimentosFinalizados));
  }, [atendimentosFinalizados]);

  // Limpa o timer caso o componente seja desmontado
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  // --- FUNÇÕES DE LÓGICA ---

  const finalizarAtendimento = (status) => {
    if (!senhaAtual) return;

    const agora = new Date();
    const atendimentoConcluido = {
      ...senhaAtual,
      status, // 'Concluído' ou 'Não Compareceu'
      data: agora.toISOString().split('T')[0], // Formato YYYY-MM-DD
      horaFinalizacao: agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
    
    setAtendimentosFinalizados(prev => [...prev, atendimentoConcluido]);
    setFilaDeSenhas(prevFila => prevFila.slice(1));
    
    // Reseta todos os estados de controle
    setAtendimentoEmAndamento(false);
    setChamadaStatus('idle');
    clearTimeout(timerRef.current);
  };
  
  const iniciarTimer = (proximoStatusExpirado) => {
    clearTimeout(timerRef.current); // Limpa qualquer timer anterior
    timerRef.current = setTimeout(() => {
      setChamadaStatus(proximoStatusExpirado);
    }, TEMPO_ESPERA);
  };

  const handleIniciarChamada = () => {
    if (senhaAtual && chamadaStatus === 'idle') {
      setChamadaStatus('chamando_1');
      iniciarTimer('expirado_1');
    }
  };

  const handleChamarNovamente = () => {
    if (senhaAtual && chamadaStatus === 'expirado_1') {
      setChamadaStatus('chamando_2');
      iniciarTimer('expirado_2');
    }
  };

  const handleConfirmarComparecimento = () => {
    clearTimeout(timerRef.current);
    setChamadaStatus('idle');
    setAtendimentoEmAndamento(true);
  };

  const handleNaoCompareceu = () => {
    finalizarAtendimento('Não Compareceu');
  };
  
  const handleChamarProxima = () => {
    if (atendimentoEmAndamento) {
      finalizarAtendimento('Concluído');
    }
  };
  
  const handleGerarRelatorio = () => {
    const hoje = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const atendimentosDeHoje = atendimentosFinalizados.filter(at => at.data === hoje);

    if (atendimentosDeHoje.length === 0) {
      alert("Nenhum atendimento foi finalizado hoje.");
      return;
    }

    let relatorio = `Relatório de Atendimentos do Dia: ${new Date().toLocaleDateString('pt-BR')}\n\n`;
    atendimentosDeHoje.forEach(at => {
      relatorio += `- Senha: ${at.senha} | Status: ${at.status}\n`;
      relatorio += `  Cliente: ${at.nome}\n`;
      relatorio += `  Tipo: ${at.tipo}\n`;
      relatorio += `  Hora de Geração: ${at.hora}\n`;
      relatorio += `  Hora de Finalização: ${at.horaFinalizacao}\n`;
      relatorio += `--------------------------------------\n`;
    });

    alert(relatorio);
  };

  const handleGerarSenha = () => {
    navigate('/');
  };
  
  // --- RENDERIZAÇÃO DOS BOTÕES DE AÇÃO ---
  const renderizarAcoes = () => {
    if (!senhaAtual) return null;

    if (atendimentoEmAndamento) {
      return (
        <button className="adm-next-btn" onClick={handleChamarProxima}>
          Finalizar e Chamar Próxima
        </button>
      );
    }
    
    switch(chamadaStatus) {
      case 'idle':
        return (
          <button className="adm-attend-btn" onClick={handleIniciarChamada}>
            Realizar Atendimento
          </button>
        );
      case 'chamando_1':
      case 'chamando_2':
        return (
          <>
            <span style={{color: '#333', fontWeight: 'bold'}}>
              Aguardando cliente... ({chamadaStatus === 'chamando_1' ? '1ª' : '2ª'} chamada)
            </span>
            <button className="adm-attend-btn" onClick={handleConfirmarComparecimento}>
              Confirmar Comparecimento
            </button>
          </>
        );
      case 'expirado_1':
        return (
          <button className="adm-next-btn" onClick={handleChamarNovamente}>
            Chamar Novamente
          </button>
        );
      case 'expirado_2':
        return (
          <button className="adm-next-btn" onClick={handleNaoCompareceu}>
            Chamar Próxima (Não Compareceu)
          </button>
        );
      default:
        return null;
    }
  };

  return (
     <>
      <style>{styles}</style>
      <div className="adm-container">
        {/* barra de navegação */}
        <header className="adm-navbar">
          <span className="adm-logo-principal"></span>
          <button className="adm-btn" onClick={handleGerarSenha}>Gerar nova senha</button>
        </header>

        {/* body da página */}
        <main className="adm-main">

          <h2 className="adm-subtitle">Próximo atendimento</h2>
          
          <div className="adm-content">
            <div className="adm-card">
              {senhaAtual ? (
                <>
                  <div className="adm-header">
                    <span className="adm-logo"></span>
                    <span className="adm-title">Ticket Gerado</span>
                  </div>

                  <div className="adm-info">
                    <div className="adm-client">
                      <span className="adm-client-name">{senhaAtual.nome}</span>
                      <span className="adm-client-label">Cliente</span>
                    </div>

                    <div className="adm-password">
                      <span className="adm-password-value">{senhaAtual.senha}</span>
                      <span className="adm-password-label">Senha</span>
                    </div>

                    <div className="adm-hour">
                      <span className="adm-hour-value">{senhaAtual.hora}</span>
                      <span className="adm-hour-label">Hora</span>
                    </div>

                    <div className="adm-id">
                      <span className="adm-id-value">{senhaAtual.id}</span>
                      <span className="adm-id-label">Id</span>
                    </div>

                    <div className="adm-sector">
                      <span className="adm-sector-value">{senhaAtual.setor}</span>
                      <span className="adm-sector-label">Setor</span>
                    </div>

                    <div className="adm-type">
                      <span className="adm-type-value">{senhaAtual.tipo}</span>
                      <span className="adm-type-label">Tipo</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="adm-header" style={{ justifyContent: 'center', marginBottom: 0 }}>
                  <span className="adm-title" style={{ fontSize: '24px' }}>Fila de atendimentos vazia!</span>
                </div>
              )}
            </div>
          </div>

          <div className="adm-bottom-actions">
            <div className="adm-left-actions">
              {renderizarAcoes()}
            </div>
            <button className="adm-finish-btn" onClick={handleGerarRelatorio}>Gerar relatório diário</button>
          </div>
        </main>

        <footer className="footer"></footer>
      </div>
    </>
  );
}

export default Adm;