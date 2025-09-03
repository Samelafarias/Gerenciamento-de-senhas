import React, { useState, useEffect } from 'react';


function Visor() {
  const [senhasChamadas, setSenhasChamadas] = useState([]);

  const carregarSenhas = () => {
    try {
      const dadosSalvos = localStorage.getItem('senhasChamadas');
      if (dadosSalvos) {
        setSenhasChamadas(JSON.parse(dadosSalvos));
      }
    } catch (error) {
      console.error("Erro ao carregar senhas do localStorage:", error);
      setSenhasChamadas([]);
    }
  };

  useEffect(() => {

    carregarSenhas();

    const handleStorageChange = (event) => {
      if (event.key === 'senhasChamadas') {
        carregarSenhas();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); 


  const senhaPrincipal = senhasChamadas.length > 0 ? senhasChamadas[senhasChamadas.length - 1] : null;
  const ultimasSenhas = senhasChamadas.length > 1 ? senhasChamadas.slice(-4, -1).reverse() : [];

  return (
    <>
      {}
      <style>
        {`
          * {
            background-color: #F5F1F1;
            font-family: Arial, sans-serif;
          }

          /* body da página */
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
          }

          .visor-main {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            padding: 40px 20px;
          }

          /* card */
          .visor-card {
            background: #0A4551;
            border-radius: 10px;
            width: 35%;
            max-width: 1000px;
            min-width: 400px;
            min-height: 250px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.349);
            justify-content: space-between;
            align-items: center;
            margin-top: 10vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
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

          /* informações */
          .visor-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto auto;
            gap: 20px 130px;
            background: #0A4551;
            padding: 20px;
          }
          
          .visor-client,
          .visor-password,
          .visor-hour,
          .visor-sector,
          .visor-type {
            display: flex;
            flex-direction: column;
            color: #fff;
            background: #0A4551;
          }

          .visor-client-name,
          .visor-password-value,
          .visor-hour-value,
          .visor-sector-value,
          .visor-type-value {
            font-weight: bold;
            font-size: 24px;
            background: #0A4551;
            color: #F5F1F1;
          }

          .visor-client-label,
          .visor-password-label,
          .visor-hour-label,
          .visor-sector-label,
          .visor-type-label {
            font-size: 16px;
            background: #0A4551;
            color: #ccc;
          }
          
          .div {
            background: #0A4551;
          }

          /* últimas senhas chamadas */
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

          /* Torna os spans dentro dos cards transparentes para o background do pai */
          .visor-last-card span, .visor-last-card div {
            background-color: transparent;
          }
        `}
      </style>

      <div className="visor-container">
        {/* conteúdo central */}
        <div className="visor-content">
          {/* card principal */}
          <div className="visor-card">
            <div className="visor-info">

              {/* linha 1 do card */}
              <div className="visor-client">
                <span className="visor-client-name">{senhaPrincipal?.nome || 'Aguardando Cliente'}</span>
                <span className="visor-client-label">Cliente</span>
              </div>

              {/* espaço vazio pra alinhar o grid */}
              <div className='div'></div>

              {/* linha 2 do card */}
              <div className="visor-password">
                <span className="visor-password-value">{senhaPrincipal?.senha || '---'}</span>
                <span className="visor-password-label">Senha</span>
              </div>

              <div className="visor-sector">
                <span className="visor-sector-value">{senhaPrincipal?.guiche || '---'}</span>
                <span className="visor-sector-label">Guichê</span>
              </div>

              {/* linha 3 do card */}
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

          {/* últimas senhas chamadas */}
          <div className="visor-last">
            <h3 className="visor-last-title">Últimas senhas chamadas</h3>
            <div className="visor-last-cards">
              {ultimasSenhas.map((senha) => (
                <div className="visor-last-card" key={senha.id}>
                  <span className="visor-last-client-name">{senha.nome}</span>
                  
                  <span className="visor-last-password-label">Senha:</span>
                  <span className="visor-last-password-value">{senha.senha}</span>

                  <span className="visor-last-sector-label">Guichê:</span>
                  <span className="visor-last-sector-value">{senha.guiche}</span>
                  
                  <div className="visor-last-footer">
                    <span>{senha.hora}</span>
                    <span>{senha.data}</span>
                  </div>
                </div>
              ))}
              {/* Adiciona placeholders se houver menos de 3 senhas */}
              {Array.from({ length: 3 - ultimasSenhas.length }).map((_, index) => (
                 <div className="visor-last-card" key={`placeholder-${index}`} style={{opacity: 0.5}}>
                  <span className="visor-last-client-name">Aguardando...</span>
                  <span className="visor-last-password-label">Senha:</span>
                  <span className="visor-last-password-value">---</span>
                  <span className="visor-last-sector-label">Guichê:</span>
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