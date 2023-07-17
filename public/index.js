window.addEventListener("load", () => {
  fetch("http://localhost:3000/partidas")
    .then((resposta) => resposta.json())
    .then((partidas) => {
      carregarPartidas(partidas);
    });
});

function carregarPartidas(partidas) {
  const listaPartidas = document.querySelector("#partidas");

  for (const partida of partidas) {
    const itemPartida = document.createElement("li");
    itemPartida.textContent = `${partida.titulo} - ${partida.local} - ${partida.data}`;

    const idPartida = document.createElement("span");
    idPartida.textContent = `ID: ${partida.id}`;
    itemPartida.appendChild(idPartida);

    const listaParticipantes = document.createElement("div");
    listaParticipantes.id = `participantes-${partida.id}`;

    for (const participante of partida.jogadores) {
      const itemParticipante = document.createElement("li");
      itemParticipante.textContent = `${partida.id}: ${participante.nome} - ${participante.telefone}`;

      const confirmarPresencaCheckbox = document.createElement("input");
      confirmarPresencaCheckbox.type = "checkbox";
      confirmarPresencaCheckbox.checked = participante.confirmado; // Define o estado do checkbox com base no status de confirmação
      confirmarPresencaCheckbox.addEventListener("click", () => {
        atualizarPresenca(partida.id, participante.id, confirmarPresencaCheckbox.checked);
      });

      const confirmarPresencaLabel = document.createElement("label");
      confirmarPresencaLabel.textContent = "Confirmar Presença";
      confirmarPresencaLabel.appendChild(confirmarPresencaCheckbox);

      itemParticipante.appendChild(confirmarPresencaLabel);
      listaParticipantes.appendChild(itemParticipante);
    }

    const adicionarParticipanteForm = document.createElement("form");

    const inputNome = document.createElement("input");
    inputNome.type = "text";
    inputNome.placeholder = "Nome do participante";

    const inputTelefone = document.createElement("input");
    inputTelefone.type = "text";
    inputTelefone.placeholder = "Telefone do participante";

    const adicionarParticipanteBtn = document.createElement("button");
    adicionarParticipanteBtn.type = "button";
    adicionarParticipanteBtn.textContent = "Adicionar Participante";
    adicionarParticipanteBtn.addEventListener("click", () => {
      const nome = inputNome.value;
      const telefone = inputTelefone.value;

      if (nome && telefone) {
        adicionarParticipante(partida.id, nome, telefone);
        inputNome.value = "";
        inputTelefone.value = "";
      }
    });

    adicionarParticipanteForm.appendChild(inputNome);
    adicionarParticipanteForm.appendChild(inputTelefone);
    adicionarParticipanteForm.appendChild(adicionarParticipanteBtn);

    const removerListaBtn = document.createElement("button");
    removerListaBtn.textContent = "Remover Lista";
    removerListaBtn.addEventListener("click", () => {
      const confirmacao = confirm("Tem certeza de que deseja remover a lista de participantes?");

      if (confirmacao) {
        removerLista(partida.id);
      }
    });

    itemPartida.appendChild(listaParticipantes);
    itemPartida.appendChild(adicionarParticipanteForm);
    itemPartida.appendChild(removerListaBtn);

    listaPartidas.appendChild(itemPartida);
  }
}

function atualizarPresenca(partidaId, jogadorId, confirmado) {
  fetch(`http://localhost:3000/partidas/${partidaId}/jogadores/${jogadorId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ confirmado }),
  })
    .then((resposta) => resposta.json())
    .then((data) => {
      console.log(data);
    })
    .catch((erro) => console.error(erro));
}

function adicionarParticipante(partidaId, nome, telefone) {
  fetch(`http://localhost:3000/partidas/${partidaId}/jogadores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nome, telefone }),
  })
    .then((resposta) => resposta.json())
    .then((data) => {
      const listaParticipantes = document.querySelector(`#participantes-${partidaId}`);
      const itemParticipante = document.createElement("li");
      itemParticipante.textContent = `${partidaId}: ${nome} - ${telefone}`;
      listaParticipantes.appendChild(itemParticipante);
    })
    .catch((erro) => console.error(erro));
}

function removerLista(partidaId) {
  fetch(`http://localhost:3000/partidas/${partidaId}/jogadores`, {
    method: "DELETE",
  })
    .then(() => {
      const listaParticipantes = document.querySelector(`#participantes-${partidaId}`);
      listaParticipantes.innerHTML = "";
    })
    .catch((erro) => console.error(erro));
}
