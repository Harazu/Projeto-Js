const fs = require('fs');

// Função para ler os dados de um arquivo JSON
function lerDadosArquivo(caminhoArquivo) {
  try {
    const dadosArquivo = fs.readFileSync(caminhoArquivo, 'utf-8');
    return JSON.parse(dadosArquivo);
  } catch (error) {
    console.error('Erro ao ler o arquivo:', error);
    return null;
  }
}

// Função para gravar os dados em um arquivo JSON
function gravarDadosArquivo(caminhoArquivo, dados) {
  try {
    const dadosArquivo = JSON.stringify(dados, null, 2);
    fs.writeFileSync(caminhoArquivo, dadosArquivo, 'utf-8');
    console.log('Dados gravados com sucesso!');
  } catch (error) {
    console.error('Erro ao gravar o arquivo:', error);
  }
}

module.exports = {
  lerDadosArquivo,
  gravarDadosArquivo
};
