const autoresDoLivroDAO = require("../model/autores_do_livro.dao");

exports.listarAutoresDoLivroPorLivro = async function (id_livro) {
  return await autoresDoLivroDAO.listarAutoresDoLivroPorLivro(id_livro);
};

exports.adicionarAutorAoLivro = async function (novo_autorDoLivro) {
  const erros = [];

  const associacoes = await autoresDoLivroDAO.procurarAutorPeloId_autorDoLivro(
    novo_autorDoLivro.id_livro,
    novo_autorDoLivro.id_autor
  );

  if (associacoes.length > 0) {
    if (associacoes[0].is_ativo === true) {
      erros.push("Erro: autor já associado a este livro!");
      return erros;
    } else {
      await autoresDoLivroDAO.reativarAutorNoLivro(
        novo_autorDoLivro.id_livro,
        novo_autorDoLivro.id_autor
      );
      return [];
    }
  }

  await autoresDoLivroDAO.adicionarAutorAoLivro(novo_autorDoLivro);
  return [];
};

exports.removerAutor = async function (id_livro, id_autor) {
  return await autoresDoLivroDAO.removerAutorPeloId_autor(id_livro, id_autor);
};
