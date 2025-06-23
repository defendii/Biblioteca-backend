const db = require("../config/database");

// Função responsável por listar todos os emprestimos
exports.listarEmprestimo = async function () {
    const { rows } = await db.query(`
      SELECT e.id_emprestimo, e.data_emprestimo, e.data_devolucao, e.is_ativo,
             u.nome AS nome_usuario, u.registro_academico,
             l.titulo, l.isbn, l.edicao, l.qtde_disponivel, l.caminho_foto_capa
      FROM emprestimo e
      JOIN usuario u ON e.id_usuario = u.id_usuario
      JOIN livro l ON e.id_livro = l.id_livro
      WHERE e.is_ativo = true
    `);
    return rows;
};
// Função responsável por criar um novo emprestimo
exports.criarEmprestimo = async function (novo_emprestimo) {
    const resposta = await db.query(
        'INSERT INTO emprestimo (id_usuario, id_livro, data_emprestimo, data_devolucao, is_ativo) VALUES ($1, $2, $3, $4, $5)',
        [novo_emprestimo.id_usuario, novo_emprestimo.id_livro, novo_emprestimo.data_emprestimo, novo_emprestimo.data_devolucao, true]
    );

    return "Emprestimo cadastrado com sucesso!";
}

//Função responsável por buscar um Emprestimo a partir de seu 'id'
exports.procurarEmprestimoPeloId_emprestimo = async function (id_emprestimo) {
    const { rows } = await db.query(
        `SELECT * FROM emprestimo WHERE id_emprestimo = $1`,
        [id_emprestimo]
    );

    return rows;
}

//Função responsável por remover um Emprestimo a partir de seu 'id_emprestimo'
exports.removerEmprestimoPeloId_emprestimo = async function (id_emprestimo) {
    const { rows } = await db.query(
        `UPDATE emprestimo SET is_ativo = false WHERE id_emprestimo = $1 RETURNING *`,
        [id_emprestimo]
    );

    return rows;
}


