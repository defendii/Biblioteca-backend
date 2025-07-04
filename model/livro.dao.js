const db = require("../config/database");

// Função responsável por listar todos os livros
exports.listarLivros = async function () {
    const { rows } = await db.query("SELECT * FROM livro WHERE is_ativo = true ORDER BY titulo");
    return rows;
}

// Função responsável por criar um novo livro
exports.criarLivro = async function (novo_livro) {
    const extensao_arquivo = novo_livro.imagem.name.split(".").pop();

    const resposta = await db.query(
        `INSERT INTO livro (titulo, qtde_disponivel, isbn, edicao, caminho_foto_capa, is_ativo)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_livro`,
        [novo_livro.titulo, novo_livro.qtde_disponivel, novo_livro.isbn, novo_livro.edicao, extensao_arquivo, true]
    );

    return resposta.rows[0].id_livro;
}

//Função responsável por buscar um livro a partir de seu 'isbn'
exports.procurarLivroPeloIsbn = async function (isbn) {
    const { rows } = await db.query(
        `SELECT * FROM livro WHERE isbn = $1`,
        [isbn]
    );

    return rows;
}

//Função responsável por remover um livro a partir de seu 'id_livro'
exports.removerLivroPeloId_livro = async function (id_livro) {
    const { rows } = await db.query(
        `UPDATE livro SET is_ativo = false WHERE id_livro = '${id_livro}'`
    );

    return rows;
}

exports.atualizarLivroPeloId = async function (livro) {
    const query = `
        UPDATE livro  
        SET titulo = $1,
            qtde_disponivel = $2,
            isbn = $3,
            edicao = $4,
            caminho_foto_capa = $5,
            is_ativo = $6
            WHERE id_livro = $7
        RETURNING *;
    `;

    const values = [
        livro.titulo,
        livro.qtde_disponivel,
        livro.isbn,
        livro.edicao,
        livro.caminho_foto_capa,
        livro.is_ativo,
        livro.id_livro
    ];

    const { rows } = await db.query(query, values);

    return rows[0];
}
