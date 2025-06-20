const editoraDAO = require("../model/editora_do_livro.dao");

exports.listarEditoraDoLivro = async function(id_livro) {
  return await editoraDAO.listarEditoraDoLivro(id_livro);
}

exports.associarEditoraAoLivro = async function({ id_livro, id_editora }) {
  await editoraDAO.associarEditoraAoLivro(id_livro, id_editora);
  return [];
}

exports.removerEditoraDoLivro = async function(id_livro) {
  return await editoraDAO.removerEditoraDoLivro(id_livro);
}
