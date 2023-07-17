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
    itemPartida.textContent = `${partida.titulo} - ${partida.local} - ${partida.data} `;
    listaPartidas.appendChild(itemPartida);
  }
}