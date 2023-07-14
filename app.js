// Função para lidar com o envio do formulário de criação de partida
function handleCriarPartida(event) {
    event.preventDefault();
  
    const titulo = document.getElementById('titulo').value;
    const local = document.getElementById('local').value;
    const data = document.getElementById('data').value;
    const horario = document.getElementById('horario').value;
  
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
    body: JSON.stringify({ titulo, local, data, horario, jogadores: [] })
  })
    .then(response => response.json())
    .then(partida => {
      const partidasList = document.getElementById('partidasList');
      const partidaElement = document.createElement('div');
      partidaElement.textContent = `Título: ${partida.titulo}, Local: ${partida.local}, Data: ${partida.data}, Horário: ${partida.horario}`;
      partidasList.appendChild(partidaElement);
      // Limpar o formulário após a criação da partida
      criarPartidaForm.reset();
      // Chamar a função para exibir a lista de jogadores
      exibirListaJogadores(partida.id);
    })
    .catch(error => {
      console.error('Erro ao criar partida:', error);
    });
}
}

  
  // Função para carregar as partidas do servidor e exibir na tela
  function carregarPartidas() {
    fetch('/partidas')
      .then(response => response.json())
      .then(partidas => {
        const partidasList = document.getElementById('partidasList');
        partidasList.innerHTML = '';
  
        partidas.forEach(partida => {
          const partidaItem = document.createElement('li');
          partidaItem.textContent = `Título: ${partida.titulo}, Local: ${partida.local}, Data: ${partida.data}, Horário: ${partida.horario}`;
          partidasList.appendChild(partidaItem);
        });
      })
      .catch(error => {
        console.error('Erro ao carregar partidas:', error);
      });
  }
  
  // Adicionar o evento de submit ao formulário
  const criarPartidaForm = document.getElementById('criarPartidaForm');
  criarPartidaForm.addEventListener('submit', handleCriarPartida);

  function exibirListaJogadores(partidaId) {
    const partida = partidas.find(p => p.id === partidaId);
    if (!partida) {
      console.error('Partida não encontrada.');
      return;
    }
  
    const listaJogadores = document.getElementById('listaJogadores');
    listaJogadores.innerHTML = '';
  
    partida.jogadores.forEach(jogador => {
      const jogadorItem = document.createElement('div');
      jogadorItem.textContent = `Jogador: ${jogador.nome}, Telefone: ${jogador.telefone}, Presente: ${jogador.presente ? 'Sim' : 'Não'}`;
  
      // Adicionar botão para confirmar presença
      const btnConfirmarPresenca = document.createElement('button');
      btnConfirmarPresenca.textContent = 'Confirmar Presença';
      btnConfirmarPresenca.addEventListener('click', () => {
        marcarPresenca(partidaId, jogador.id);
      });
  
      jogadorItem.appendChild(btnConfirmarPresenca);
      listaJogadores.appendChild(jogadorItem);
    });
  }
  

  // Função para marcar a presença de um jogador em uma partida
function marcarPresenca(partidaId, jogadorId) {
  const partida = partidas.find(p => p.id === partidaId);
  if (!partida) {
    console.error('Partida não encontrada.');
    return;
  }

  const jogador = partida.jogadores.find(j => j.id === jogadorId);
  if (!jogador) {
    console.error('Jogador não encontrado.');
    return;
  }

  jogador.presente = true;
  console.log(`Presença confirmada para o jogador ${jogador.nome} na partida ${partida.titulo}`);
  // Atualizar a exibição da lista de jogadores
  exibirListaJogadores(partidaId);
}

  

  // Função para excluir uma partida
  function excluirPartida(partidaId) {
  fetch(`/partidas/${partidaId}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.mensagem);
      // Atualizar a lista de partidas após a exclusão
      carregarPartidas();
    })
    .catch(error => {
      console.error('Erro ao excluir partida:', error);
    });
}

  
  // Carregar as partidas ao carregar a página
  window.addEventListener('load', carregarPartidas);
  