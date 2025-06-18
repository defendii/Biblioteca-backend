const autoresDAO = require("../model/autores.dao");

exports.listarAutoresDoLivroPorLivro = async function(id_livro) {
  return autoresDAO.listarAutoresDoLivroPorLivro(id_livro);
}


exports.adicionarAutorAoLivro = async function (novo_autorDoLivro) {
    const erros = [];

    const associacoes = await autoresDAO.procurarAutorPeloId_autor(novo_autorDoLivro.id_livro, novo_autorDoLivro.id_autor);

    if (associacoes.length != 0) {
        erros.push("Erro: autor já associado a este livro!");
    }

    if (erros.length > 0) {
        return erros;
    }

    await autoresDAO.adicionarAutorAoLivro(Qnovo_autorDoLivro);
    return [];
};

exports.removerAutor = async function (id_livro, id_autor) {
    return await autoresDAO.removerAutorPeloId_autor(id_livro, id_autor);
};
