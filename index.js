import express from "express";

const port = 3000; // A porta que será usada pela sua aplicação.
const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const partidas = [ {
    titulo: "Carros",
    local: "Desconhecido",
    data: 2004,
    jogadores: [],
  },];

app.get('/partidas' , (req, res) => res.send(partidas));

app.get("/partidas/:id", (req, res) => {
    const indicePartida = partidas.findIndex((partida) => partida.id == req.params.id);
    if (indicePartida >= 0) {
      res.status(200).send(partidas[indicePartida]);
    } else res.status(404).send({ mensagem: "Não foi encontrado" });
  });

app.post("/partidas", (req, res) => {
    const { titulo, local, data } = req.body;
    const novoPartida = {
      titulo,
      local,
      data,
    };
    partidas.push(novoPartida);
    res.redirect("/");
  }); 

  app.listen(port, () => {
    console.log(`Executando em http://localhost:${port}`);
  });