const categoriasDAO = require("../model/categoria_do_livro.dao");

exports.listarCategoriasDoLivro = async function(id_livro) {
  return await categoriasDAO.listarCategoriasDoLivro(id_livro);
}

exports.adicionarCategoriaAoLivro = async function({ id_livro, id_categoria }) {
  const erros = [];

  const vinculo = await categoriasDAO.buscarVinculoCategoriaLivro(id_livro, id_categoria);

  if (vinculo && vinculo.is_ativo === true) {
    erros.push("Erro: categoria já associada a este livro!");
  }

  if (erros.length > 0) {
    return erros;
  }

  await categoriasDAO.adicionarCategoriaAoLivro(id_livro, id_categoria);
  return [];
}

exports.removerCategoriaDoLivro = async function(id_livro, id_categoria) {
  return await categoriasDAO.removerCategoriaDoLivro(id_livro, id_categoria);
}
