const db = require('./DBController');


exports.listarAutoresDoLivro = async function () {
  const sql = "SELECT * FROM autores_do_livro WHERE is_ativo = 1";
  const [rows] = await db.query(sql);
  return rows;
};

exports.listarAutoresDoLivroPorLivro = async function (id_livro) {
  const sql = "SELECT * FROM autores_do_livro WHERE id_livro = ? AND is_ativo = 1";
  const [rows] = await db.query(sql, [id_livro]);
  return rows;
};

exports.adicionarAutorAoLivro = async function (autorDoLivro) {
  const sql = "INSERT INTO autores_do_livro (id_livro, id_autor, is_ativo) VALUES (?, ?, ?)";
  await db.query(sql, [autorDoLivro.id_livro, autorDoLivro.id_autor, autorDoLivro.is_ativo]);
};

exports.procurarAutorPeloId_autorDoLivro = async function (id_livro, id_autor) {
  const sql = "SELECT * FROM autores_do_livro WHERE id_livro = ? AND id_autor = ?";
  const [rows] = await db.query(sql, [id_livro, id_autor]);
  return rows;
};

exports.reativarAutorNoLivro = async function (id_livro, id_autor) {
  const sql = "UPDATE autores_do_livro SET is_ativo = 1 WHERE id_livro = ? AND id_autor = ?";
  await db.query(sql, [id_livro, id_autor]);
};

exports.removerAutorPeloId_autor = async function (id_livro, id_autor) {
  const sql = "UPDATE autores_do_livro SET is_ativo = 0 WHERE id_livro = ? AND id_autor = ?";
  await db.query(sql, [id_livro, id_autor]);
};
