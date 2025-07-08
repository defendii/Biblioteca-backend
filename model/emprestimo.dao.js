const db = require("../config/database");
const conexao = require("../config/database");

// Listar todos os empréstimos
exports.listarEmprestimo = async function () {
  const { rows } = await db.query(`
    SELECT e.id_emprestimo, e.data_emprestimo, e.data_devolucao, e.is_ativo,
       e.foi_devolvido, e.data_devolucao_efetiva,  -- incluir esta linha
       u.nome AS nome_usuario, u.registro_academico,
       l.titulo, l.isbn, l.edicao, l.qtde_disponivel, l.caminho_foto_capa
FROM emprestimo e
JOIN usuario u ON e.id_usuario = u.id_usuario
JOIN livro l ON e.id_livro = l.id_livro
WHERE e.is_ativo = true
  `);
  return rows;
};

// Criar novo empréstimo
exports.criarEmprestimo = async function (novo_emprestimo) {
  await db.query(
    `INSERT INTO emprestimo (id_usuario, id_livro, data_emprestimo, data_devolucao, is_ativo)
     VALUES ($1, $2, $3, $4, $5)`,
    [
      novo_emprestimo.id_usuario,
      novo_emprestimo.id_livro,
      novo_emprestimo.data_emprestimo,
      novo_emprestimo.data_devolucao,
      true,
    ]
  );

  return "Empréstimo cadastrado com sucesso!";
};

exports.marcarComoDevolvido = async (id_emprestimo) => {
  const hoje = new Date().toISOString().split("T")[0];
  const sql = `
    UPDATE emprestimo 
    SET foi_devolvido = true, data_devolucao_efetiva = $2
    WHERE id_emprestimo = $1
  `;
  return await db.query(sql, [id_emprestimo, hoje]);
};


// Buscar empréstimo pelo ID
exports.procurarEmprestimoPeloId_emprestimo = async function (id_emprestimo) {
  const { rows } = await db.query(
    `SELECT * FROM emprestimo WHERE id_emprestimo = $1`,
    [id_emprestimo]
  );
  return rows;
};

// Remover (inativar) empréstimo
exports.removerEmprestimoPeloId_emprestimo = async function (id_emprestimo) {
  const { rows } = await db.query(
    `UPDATE emprestimo SET is_ativo = false WHERE id_emprestimo = $1 RETURNING *`,
    [id_emprestimo]
  );
  return rows;
};

// Contar quantos empréstimos ativos existem para determinado livro
exports.contarEmprestimosAtivosPorLivro = async function (id_livro) {
  const { rows } = await db.query(
    `SELECT COUNT(*) FROM emprestimo WHERE id_livro = $1 AND is_ativo = true`,
    [id_livro]
  );
  return parseInt(rows[0].count);
};


exports.listarEmprestimosDoUsuario = async function (id_usuario) {
  const sql = `
    SELECT e.*, l.titulo
    FROM emprestimo e
    JOIN livro l ON e.id_livro = l.id_livro
    WHERE e.id_usuario = $1
    ORDER BY e.data_emprestimo DESC
  `;

  console.log("Executando a query para o id_usuario:", id_usuario);

  try {
    const { rows } = await db.query(sql, [id_usuario]);
    console.log("Query executada com sucesso, resultados:", rows.length);
    return rows;
  } catch (err) {
    console.error("Erro na query:", err);
    throw err;
  }
};

