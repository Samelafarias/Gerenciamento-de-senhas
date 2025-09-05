import React, { useState, useEffect, useRef } from 'react';
import socket from '../socket';

function Visor() {
  const [senhaPrincipal, setSenhaPrincipal] = useState(null);
  const [historicoSenhas, setHistoricoSenhas] = useState([]);
  
  const audioRef = useRef(null);

  useEffect(() => {
  socket.on('nova-senha-chamada', (senha) => {
      setSenhaPrincipal(senha);
    
      if (audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Falha na reprodução automática do áudio:", error);
            console.log("Isso acontece devido às políticas de autoplay do navegador, que exigem uma interação do usuário na página antes de permitir o som.");
          });
        }
      }
    });

    socket.on('finalizados-inicial', (finalizados) => {
      setHistoricoSenhas(finalizados);
      if (finalizados.length > 0) {
        setSenhaPrincipal(finalizados[finalizados.length - 1]);
      }
    });

    socket.on('atualizar-finalizados', (novosFinalizados) => {
      setHistoricoSenhas(novosFinalizados);
    });

    return () => {
      socket.off('nova-senha-chamada');
      socket.off('finalizados-inicial');
      socket.off('atualizar-finalizados');
    };
  }, []); 

  const ultimasSenhas = historicoSenhas.slice(-3).reverse();

  const styles = `
        * {
          background-color: #F5F1F1;
          font-family: Arial, sans-serif;
        }

        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: hidden;
        }

        .visor-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .visor-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
        }

        .visor-card {
          background: #0A4551;
          border-radius: 10px;
          width: 35%;
          max-width: 1000px;
          min-width: 400px;
          min-height: 250px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.349);
          margin-top: 10vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .visor-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px 130px;
          background: #0A4551;
          padding: 20px;
        }
        
        .visor-client, .visor-password, .visor-hour, .visor-sector, .visor-type {
          display: flex;
          flex-direction: column;
          color: #fff;
          background: #0A4551;
        }

        .visor-client-name, .visor-password-value, .visor-hour-value, .visor-sector-value, .visor-type-value {
          font-weight: bold;
          font-size: 24px;
          background: #0A4551;
          color: #F5F1F1;
        }

        .visor-client-label, .visor-password-label, .visor-hour-label, .visor-sector-label, .visor-type-label {
          font-size: 16px;
          background: #0A4551;
          color: #ccc;
        }
        
        .div-vazia {
          background: #0A4551;
        }

        .visor-last {
          position: absolute;
          bottom: 0;
          width: 100%;
          background: #0A4551;
          padding: 15px 0;
          box-sizing: border-box;
        }

        .visor-last-title {
          text-align: center;
          font-weight: bold;
          font-size: 22px;
          background: #0A4551;
          color: #fff;
          margin: 0 0 15px 0;
        }

        .visor-last-cards {
          display: flex;
          justify-content: center;
          gap: 30px;
          background: #0A4551;
        }

        .visor-last-card {
          background: #f4f4f4;
          padding: 10px 25px;
          border-radius: 10px;
          width: 200px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
          display: grid;
          grid-template-areas:
            "name name"
            "label-pass value-pass"
            "label-sector value-sector"
            "footer footer";
          gap: 5px 10px;
          font-size: 14px;
          color: #333;
        }
        
        .visor-last-client-name { grid-area: name; font-size: 16px; font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 5px; }
        .visor-last-password-label { grid-area: label-pass; text-align: left; }
        .visor-last-password-value { grid-area: value-pass; font-weight: bold; text-align: right; }
        .visor-last-sector-label { grid-area: label-sector; text-align: left; }
        .visor-last-sector-value { grid-area: value-sector; font-weight: bold; text-align: right; }
        .visor-last-footer { grid-area: footer; display: flex; justify-content: space-between; font-size: 12px; margin-top: 5px; color: #666; }

        .visor-last-card span, .visor-last-card div {
          background-color: transparent;
        }
      `; 

  return (
    <>
      <style>{styles}</style>
      
      {/* O elemento de áudio está aqui, invisível, pronto para ser ativado pelo JavaScript */}
      <audio ref={audioRef} src="/sounds/notificacao.mp3" preload="auto"></audio>

      <div className="visor-container">
        <div className="visor-content">
          <div className="visor-card">
            <div className="visor-info">
              <div className="visor-client">
                <span className="visor-client-name">{senhaPrincipal?.nome || 'Aguardando Cliente'}</span>
                <span className="visor-client-label">Cliente</span>
              </div>
              <div className='div-vazia'></div>
              <div className="visor-password">
                <span className="visor-password-value">{senhaPrincipal?.senha || '---'}</span>
                <span className="visor-password-label">Senha</span>
              </div>
              <div className="visor-sector">
                <span className="visor-sector-value">{senhaPrincipal?.setor || '---'}</span>
                <span className="visor-sector-label">Setor</span>
              </div>
              <div className="visor-hour">
                <span className="visor-hour-value">{senhaPrincipal?.hora || '--:--'}</span>
                <span className="visor-hour-label">Hora</span>
              </div>
              <div className="visor-type">
                <span className="visor-type-value">{senhaPrincipal?.tipo || '---'}</span>
                <span className="visor-type-label">Tipo</span>
              </div>
            </div>
          </div>
          <div className="visor-last">
            <h3 className="visor-last-title">Últimas senhas chamadas</h3>
            <div className="visor-last-cards">
              {ultimasSenhas.map((senha) => (
                <div className="visor-last-card" key={senha.id}>
                  <span className="visor-last-client-name">{senha.nome}</span>
                  <span className="visor-last-password-label">Senha:</span>
                  <span className="visor-last-password-value">{senha.senha}</span>
                  <span className="visor-last-sector-label">Setor:</span>
                  <span className="visor-last-sector-value">{senha.setor}</span>
                  <div className="visor-last-footer">
                    <span>{senha.hora}</span>
                    <span>{new Date(senha.data).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              ))}
              {Array.from({ length: 3 - ultimasSenhas.length }).map((_, index) => (
                  <div className="visor-last-card" key={`placeholder-${index}`} style={{opacity: 0.5}}>
                    <span className="visor-last-client-name">Aguardando...</span>
                    <span className="visor-last-password-label">Senha:</span>
                    <span className="visor-last-password-value">---</span>
                    <span className="visor-last-sector-label">Setor:</span>
                    <span className="visor-last-sector-value">---</span>
                    <div className="visor-last-footer">
                      <span>--:--</span>
                      <span>--/--/----</span>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Visor;