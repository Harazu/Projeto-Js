import express from "express";

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

let idCounter = 0;
const partidas = [];

app.get("/partidas", (req, res) => res.send(partidas));

app.get("/partidas/:id", (req, res) => {
  const partidaId = parseInt(req.params.id);
  const partida = partidas.find((partida) => partida.id === partidaId);
  if (partida) {
    res.status(200).send(partida);
  } else {
    res.status(404).send({ mensagem: "Partida não encontrada" });
  }
});

app.post("/partidas", (req, res) => {
  const { titulo, local, data } = req.body;
  const novaPartida = {
    id: ++idCounter,
    titulo,
    local,
    data,
    jogadores: [],
  };
  partidas.push(novaPartida);
  res.redirect("/");
});

app.post("/partidas/:id/jogadores", (req, res) => {
  const partidaId = parseInt(req.params.id);
  const partida = partidas.find((partida) => partida.id === partidaId);
  if (partida) {
    const { nome, telefone } = req.body;
    const novoJogador = {
      id: ++idCounter,
      nome,
      telefone,
    };
    partida.jogadores.push(novoJogador);
    res.status(201).send({ mensagem: "Jogador adicionado com sucesso" });
  } else {
    res.status(404).send({ mensagem: "Partida não encontrada" });
  }
});

app.delete("/partidas/:partidaId/jogadores/:jogadorId", (req, res) => {
  const partidaId = parseInt(req.params.partidaId);
  const jogadorId = parseInt(req.params.jogadorId);
  const partida = partidas.find((partida) => partida.id === partidaId);
  if (partida) {
    const index = partida.jogadores.findIndex((jogador) => jogador.id === jogadorId);
    if (index !== -1) {
      partida.jogadores.splice(index, 1);
      res.status(200).send({ mensagem: "Jogador removido com sucesso" });
    } else {
      res.status(404).send({ mensagem: "Jogador não encontrado" });
    }
  } else {
    res.status(404).send({ mensagem: "Partida não encontrada" });
  }
});

app.patch("/partidas/:partidaId/jogadores/:jogadorId", (req, res) => {
  const partidaId = parseInt(req.params.partidaId);
  const jogadorId = parseInt(req.params.jogadorId);
  const confirmado = req.body.confirmado;

  const partida = partidas.find((partida) => partida.id === partidaId);
  if (partida) {
    const jogador = partida.jogadores.find((jogador) => jogador.id === jogadorId);
    if (jogador) {
      jogador.confirmado = confirmado;
      res.status(200).send({ mensagem: "Status de presença atualizado com sucesso" });
    } else {
      res.status(404).send({ mensagem: "Jogador não encontrado" });
    }
  } else {
    res.status(404).send({ mensagem: "Partida não encontrada" });
  }
});

app.listen(port, () => {
  console.log(`Executando em http://localhost:${port}`);
});
