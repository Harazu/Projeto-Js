// Função para lidar com o envio do formulário de criação de partida
function handleCriarPartida(event) {
    event.preventDefault();
  
    const titulo = document.getElementById('titulo').value;
    const local = document.getElementById('local').value;
    const data = document.getElementById('data').value;
    const horario = document.getElementById('horario').value;
  
    fetch('/partidas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ titulo, local, data, horario })
    })
      .then(response => response.json())
      .then(partida => {
        const partidasList = document.getElementById('partidasList');
        const partidaElement = document.createElement('div');
        partidaElement.textContent = `Título: ${partida.titulo}, Local: ${partida.local}, Data: ${partida.data}, Horário: ${partida.horario}`;
        partidasList.appendChild(partidaElement);
      })
      .catch(error => {
        console.error('Erro ao criar partida:', error);
      });
  }
  
  // Função para carregar as partidas do servidor e exibir na tela
  function carregarPartidas() {
    fetch('/partidas')
      .then(response => response.json())
      .then(partidas => {
        const partidasList = document.getElementById('partidasList');
        partidasList.innerHTML = '';
  
        partidas.forEach(partida => {
          const partidaElement = document.createElement('div');
          partidaElement.textContent = `Título: ${partida.titulo}, Local: ${partida.local}, Data: ${partida.data}, Horário: ${partida.horario}`;
          partidasList.appendChild(partidaElement);
        });
      })
      .catch(error => {
        console.error('Erro ao carregar partidas:', error);
      });
  }
  
  // Adicionar o evento de submit ao formulário
  const criarPartidaForm = document.getElementById('criarPartidaForm');
  criarPartidaForm.addEventListener('submit', handleCriarPartida);
  
  // Carregar as partidas ao carregar a página
  window.addEventListener('load', carregarPartidas);
  