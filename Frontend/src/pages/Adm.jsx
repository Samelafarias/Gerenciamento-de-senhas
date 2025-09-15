import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../socket'; 

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
    margin-top: auto;
  }
`;


// constante que define o tempo de espera (em milissegundos) para o cliente aparecer após a chamada.
const TEMPO_ESPERA = 7000 // 7 segundos para chamar nova senha


// componente principal da página de administração.
function Adm() {
  const navigate = useNavigate();
    // useRef é usado para guardar a referência do timer (setTimeout).
  // isso permite que o timer seja cancelado a qualquer momento, sem causar uma nova renderização.
  const timerRef = useRef(null);

  
  //GERENCIAMENTO DE ESTADO (useState)
  const [filaDeSenhas, setFilaDeSenhas] = useState([]);// armazena a fila de senhas recebida do servidor.
  const [atendimentosFinalizados, setAtendimentosFinalizados] = useState([]);// armazena os atendimentos já finalizados.
  const [atendimentoEmAndamento, setAtendimentoEmAndamento] = useState(false);// flag que indica se o atendente está ocupado com um cliente.
  const [chamadaStatus, setChamadaStatus] = useState('idle');// controla a máquina de estados do processo de chamada.

    //EFEITOS (useEffect)
     // esse useEffect configura a comunicação com o servidor via Socket.IO.
  useEffect(() => {
     // define "ouvintes" para os eventos vindos do servidor.
    socket.on('fila-inicial', (fila) => setFilaDeSenhas(fila));
    socket.on('finalizados-inicial', (finalizados) => setAtendimentosFinalizados(finalizados));
    socket.on('atualizar-fila', (novaFila) => setFilaDeSenhas(novaFila));
    socket.on('atualizar-finalizados', (novosFinalizados) => {
        setAtendimentosFinalizados(novosFinalizados);
    });

    // função de limpeza: é executada quando o componente é "desmontado".
    // remove os "ouvintes" para evitar vazamentos de memória.
    return () => {
      socket.off('fila-inicial');
      socket.off('finalizados-inicial');
      socket.off('atualizar-fila');
      socket.off('atualizar-finalizados');
    };
  }, []); // o array vazio [] garante que este efeito rode apenas uma vez (na montagem do componente).

   // este useEffect garante que qualquer timer ativo seja limpo quando o componente for desmontado.
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  
  //DADOS DERIVADOS

  // cria uma cópia ordenada da fila de senhas para garantir que o próximo atendimento seja sempre o correto.
  const filaOrdenada = [...filaDeSenhas].sort((a, b) => {
    const numA = parseInt(a.senha.replace(/\D/g, ''), 10);
    const numB = parseInt(b.senha.replace(/\D/g, ''), 10);
    return numA - numB;
  });

   // pega o primeiro item da fila ordenada, que é a senha do próximo cliente a ser atendido.
  const senhaAtual = filaOrdenada.length > 0 ? filaOrdenada[0] : null;

   // FUNÇÕES DE LÓGICA 

  //finaliza o atendimento atual, define um status, e notifica o servidor.
  const finalizarAtendimento = (status) => {
    if (!senhaAtual) return; // Não faz nada se não houver senha atual.
    const agora = new Date();
    // cria um objeto com os dados do atendimento concluído.
    const atendimentoConcluido = {
      ...senhaAtual,
      status,
      data: agora.toISOString().split('T')[0],
      horaFinalizacao: agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

        // atualiza o estado local de finalizados.
    setAtendimentosFinalizados(prevFinalizados => [...prevFinalizados, atendimentoConcluido]);
// envia o atendimento concluído para o servidor, para que ele atualize a fila para todos.
    socket.emit('finalizar-atendimento', atendimentoConcluido);

    // reseta o estado da interface para o estado inicial, pronto para o próximo cliente.
    setAtendimentoEmAndamento(false);
    setChamadaStatus('idle');
    clearTimeout(timerRef.current);
  };

    // função auxiliar para iniciar o temporizador de espera.
  const iniciarTimer = (proximoStatusExpirado) => {
    clearTimeout(timerRef.current);
      // inicia um novo timer que mudará o estado da chamada após TEMPO_ESPERA.
    timerRef.current = setTimeout(() => {
      setChamadaStatus(proximoStatusExpirado);
    }, TEMPO_ESPERA);
  };

  // handler para o botão "Realizar Atendimento".
  const handleIniciarChamada = () => {
    if (senhaAtual && chamadaStatus === 'idle') {
      socket.emit('chamar-senha', senhaAtual); // notifica o servidor para exibir a senha no painel.
      setChamadaStatus('chamando_1');// muda o estado para a primeira chamada.
      iniciarTimer('expirado_1');// inicia o timer; se expirar, muda o status para 'expirado_1'.
    }
  };

   // handler para o botão "Chamar Novamente".
  const handleChamarNovamente = () => {
    if (senhaAtual && chamadaStatus === 'expirado_1') {
      socket.emit('chamar-senha', senhaAtual);//  chama a mesma senha novamente.
      setChamadaStatus('chamando_2');// muda o estado para a segunda chamada.
      iniciarTimer('expirado_2');// inicia o timer novamente.
    }
  };

    // handler para o botão "Confirmar Comparecimento".
  const handleConfirmarComparecimento = () => {
    clearTimeout(timerRef.current);// cliente chegou, então o timer é cancelado.
    setChamadaStatus('idle');// reseta o estado da chamada.
    setAtendimentoEmAndamento(true);// indica que o atendimento está ativo.
  };

   // handler para quando o cliente não comparece após a segunda chamada.
  const handleNaoCompareceu = () => {
    finalizarAtendimento('Não Compareceu');
  };
  
  // handler para o botão "Finalizar e Chamar Próxima".
  const handleChamarProxima = () => {
    if (atendimentoEmAndamento) {
      finalizarAtendimento('Concluído');
    }
  };
  
   // gera um relatório em .txt com os atendimentos do dia e inicia o download.
  const handleGerarRelatorio = () => {
    const hoje = new Date();
    const dataFiltro = hoje.toISOString().split('T')[0]; 
    // filtra apenas os atendimentos finalizados na data de hoje.
    const atendimentosDeHoje = atendimentosFinalizados.filter(at => at.data === dataFiltro);

    if (atendimentosDeHoje.length === 0) {
      alert("Nenhum atendimento foi finalizado hoje.");
      return;
    }

    // monta o conteúdo do arquivo de texto.
    let relatorio = `Relatório de Atendimentos do Dia: ${hoje.toLocaleDateString('pt-BR')}\n`;
    relatorio += `Gerado em: ${hoje.toLocaleTimeString('pt-BR')}\n`;
    relatorio += `--------------------------------------\n\n`;

    atendimentosDeHoje.forEach(at => {
      relatorio += `- Senha: ${at.senha} | Status: ${at.status}\n`;
      relatorio += `  Cliente: ${at.nome}\n`;
      relatorio += `  Tipo: ${at.tipo}\n`;
      relatorio += `  Setor: ${at.setor}\n`;
      relatorio += `  Hora de Geração: ${at.hora}\n`;
      relatorio += `  Hora de Finalização: ${at.horaFinalizacao}\n`;
      relatorio += `--------------------------------------\n`;
    });

    
    // lógica para criar um arquivo "Blob" e simular um clique em um link para fazer o download.
    const blob = new Blob([relatorio], { type: 'text/plain;charset=utf-8' });
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    const nomeDoArquivo = `relatorio-atendimentos-${dia}-${mes}-${ano}.txt`;
    const linkDeDownload = document.createElement('a');
    linkDeDownload.href = URL.createObjectURL(blob);
    linkDeDownload.download = nomeDoArquivo;

    document.body.appendChild(linkDeDownload);
    linkDeDownload.click();
    document.body.removeChild(linkDeDownload);
  };

  // navega para a página de gerar senha.
  const handleGerarSenha = () => {
    navigate('/');
  };
  
    // RENDERIZAÇÃO CONDICIONAL

  // esta função decide quais botões de ação devem ser exibidos com base no estado atual do atendimento.
  const renderizarAcoes = () => {
    if (!senhaAtual) return null; // Se não há senha, não renderiza nada.

     // se um atendimento está em andamento, mostra apenas o botão de finalizar.
    if (atendimentoEmAndamento) {
      return (
        <button className="adm-next-btn" onClick={handleChamarProxima}>
          Finalizar e Chamar Próxima
        </button>
      );
    }
    
     // usa um switch para verificar o estado da chamada e renderizar os botões correspondentes.
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
        <header className="adm-navbar">
          <span className="adm-logo-principal"></span>
          <button className="adm-btn" onClick={handleGerarSenha}>Gerar nova senha</button>
        </header>

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
                      <span className="adm-id-label">Id (CPF)</span>
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