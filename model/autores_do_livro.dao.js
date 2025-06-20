const db = require("../config/database");

exports.listarAutoresDoLivroPorLivro = async function(id_livro) {
  const { rows } = await db.query(
    'SELECT * FROM autores_do_livro WHERE id_livro = $1 AND is_ativo = true',
    [id_livro]
  );
  return rows;
};

exports.procurarAutorPeloId_autorDoLivro = async function(id_livro, id_autor) {
  const { rows } = await db.query(
    `SELECT * FROM autores_do_livro WHERE id_livro = $1 AND id_autor = $2`,
    [id_livro, id_autor]
  );
  return rows;
};

exports.adicionarAutorAoLivro = async function(autorDoLivro) {
  const sql = "INSERT INTO autores_do_livro (id_livro, id_autor, is_ativo) VALUES ($1, $2, $3)";
  await db.query(sql, [autorDoLivro.id_livro, autorDoLivro.id_autor, autorDoLivro.is_ativo]);
};

exports.reativarAutorNoLivro = async function(id_livro, id_autor) {
  await db.query(
    `UPDATE autores_do_livro SET is_ativo = true WHERE id_livro = $1 AND id_autor = $2`,
    [id_livro, id_autor]
  );
};

exports.removerAutorPeloId_autor = async function(id_livro, id_autor) {
  await db.query(
    `UPDATE autores_do_livro SET is_ativo = false WHERE id_livro = $1 AND id_autor = $2`,
    [id_livro, id_autor]
  );
};
