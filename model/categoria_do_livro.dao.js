const db = require("../config/database");

exports.listarCategoriasDoLivro = async function (id_livro) {
  const { rows } = await db.query(
    `SELECT c.id_categoria, c.nome_categoria, c.is_ativo
     FROM categoria c
     INNER JOIN categoria_do_livro cl ON c.id_categoria = cl.id_categoria
     WHERE cl.id_livro = $1 AND cl.is_ativo = true`,
    [id_livro]
  );
  return rows;
};

exports.buscarVinculoCategoriaLivro = async function (id_livro, id_categoria) {
  const { rows } = await db.query(
    `SELECT * FROM categoria_do_livro
     WHERE id_livro = $1 AND id_categoria = $2`,
    [id_livro, id_categoria]
  );
  return rows[0]; 
};

exports.adicionarCategoriaAoLivro = async function (id_livro, id_categoria) {
  const vinculo = await this.buscarVinculoCategoriaLivro(id_livro, id_categoria);

  if (vinculo) {
    if (!vinculo.is_ativo) {
      await db.query(
        `UPDATE categoria_do_livro
         SET is_ativo = true
         WHERE id_livro = $1 AND id_categoria = $2`,
        [id_livro, id_categoria]
      );
      return true;
    } else {
      throw new Error("Categoria já está associada a este livro.");
    }
  }

  await db.query(
    `INSERT INTO categoria_do_livro (id_livro, id_categoria, is_ativo)
     VALUES ($1, $2, true)`,
    [id_livro, id_categoria]
  );
  return true;
};

exports.removerCategoriaDoLivro = async function (id_livro, id_categoria) {
  await db.query(
    `UPDATE categoria_do_livro
     SET is_ativo = false
     WHERE id_livro = $1 AND id_categoria = $2`,
    [id_livro, id_categoria]
  );
  return "Categoria removida do livro com sucesso!";
};
