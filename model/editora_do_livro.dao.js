const db = require("../config/database");

exports.listarEditoraDoLivro = async function(id_livro) {
  const { rows } = await db.query(
    `SELECT e.*
     FROM editora e
     INNER JOIN editora_do_livro ed ON e.id_editora = ed.id_editora
     WHERE ed.id_livro = $1 AND ed.is_ativo = true
     LIMIT 1`,
    [id_livro]
  );
  return rows[0]; 
}

exports.buscarVinculoEditoraLivro = async function(id_livro, id_editora) {
  const { rows } = await db.query(
    `SELECT * FROM editora_do_livro
     WHERE id_livro = $1 AND id_editora = $2`,
    [id_livro, id_editora]
  );
  return rows[0];
}

exports.buscarEditoraAtivaDoLivro = async function(id_livro) {
  const { rows } = await db.query(
    `SELECT * FROM editora_do_livro
     WHERE id_livro = $1 AND is_ativo = true`,
    [id_livro]
  );
  return rows[0];
}

exports.associarEditoraAoLivro = async function(id_livro, id_editora) {
  await db.query(
    `UPDATE editora_do_livro
     SET is_ativo = false
     WHERE id_livro = $1`,
    [id_livro]
  );

  const vinculo = await this.buscarVinculoEditoraLivro(id_livro, id_editora);

  if (vinculo) {
    await db.query(
      `UPDATE editora_do_livro
       SET is_ativo = true
       WHERE id_livro = $1 AND id_editora = $2`,
      [id_livro, id_editora]
    );
  } else {
    await db.query(
      `INSERT INTO editora_do_livro (id_livro, id_editora, is_ativo)
       VALUES ($1, $2, true)`,
      [id_livro, id_editora]
    );
  }

  return "Editora associada ao livro com sucesso!";
}


exports.removerEditoraDoLivro = async function(id_livro) {
  await db.query(
    `UPDATE editora_do_livro
     SET is_ativo = false
     WHERE id_livro = $1`,
    [id_livro]
  );
  return "Editora removida do livro com sucesso!";
}
