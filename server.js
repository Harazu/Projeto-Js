const express = require('express');
const app = express();
const port = 3000;

// Middleware para processar o corpo das requisições como JSON
app.use(express.json());


const { lerDadosArquivo, gravarDadosArquivo } = require('./fileUtils.js');

// Exemplo de uso
const caminhoArquivo = 'dados.json';

// Ler os dados do arquivo
const dadosLidos = lerDadosArquivo(caminhoArquivo);
console.log('Dados lidos:', dadosLidos);

// Modificar os dados
const novosDados = { nome: 'Exemplo', idade: 25 };

// Gravar os dados no arquivo
gravarDadosArquivo(caminhoArquivo, novosDados);

// Array para armazenar as partidas (simulação de banco de dados)
let partidas = [];

// Rota para criar uma nova partida
app.post('/partidas', (req, res) => {
  const { titulo, local, data, horario } = req.body;
  const novaPartida = { titulo, local, data, horario, jogadores: [] };
  partidas.push(novaPartida);
  res.status(201).json(novaPartida);
});

// Rota para listar todas as partidas
app.get('/partidas', (req, res) => {
  res.json(partidas);
});

// Rota para atualizar uma partida existente
app.put('/partidas/:id', (req, res) => {
  const partidaId = req.params.id;
  const { titulo, local, data, horario } = req.body;

  const partida = partidas.find((p) => p.id === partidaId);
  if (!partida) {
    return res.status(404).json({ mensagem: 'Partida não encontrada.' });
  }

  partida.titulo = titulo;
  partida.local = local;
  partida.data = data;
  partida.horario = horario;

  res.json(partida);
});

// Rota para excluir uma partida
app.delete('/partidas/:id', (req, res) => {
  const partidaId = req.params.id;
  partidas = partidas.filter((p) => p.id !== partidaId);
  res.json({ mensagem: 'Partida excluída com sucesso.' });
});

// Rota para marcar a presença de um jogador em uma partida
app.post('/partidas/:id/presenca', (req, res) => {
  const partidaId = req.params.id;
  const { jogador, telefone } = req.body;

  const partida = partidas.find((p) => p.id === partidaId);
  if (!partida) {
    return res.status(404).json({ mensagem: 'Partida não encontrada.' });
  }

  partida.jogadores.push({ jogador, telefone });
  res.json({ mensagem: 'Presença confirmada.' });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
