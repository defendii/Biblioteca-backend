const db = require("../config/database");

// Função responsável por listar todos os emprestimos
exports.listarEmprestimos = async function(){
    const {rows} = await db.query("SELECT * FROM emprestimo WHERE is_ativo = true");
    return rows;
}

// Função responsável por criar um novo emprestimo
exports.criarEmprestimo = async function(novo_emprestimo){
    const resposta = await db.query(
        'INSERT INTO emprestimo (id_usuario, id_livro, data_emprestimo, data_devolucao, is_ativo) VALUES ($1, $2, $3, $4, $5)',
        [novo_emprestimo.id_usuario, novo_emprestimo.id_livro, novo_emprestimo.data_emprestimo, novo_emprestimo.data_devolucao, true]
    );
    
    return "Emprestimo cadastrado com sucesso!";
}

//Função responsável por buscar um Emprestimo a partir de seu 'id'
exports.procurarEmprestimoPeloId_emprestimo = async function(id_emprestimo){
    const {rows} = await db.query(
       `SELECT * FROM emprestimo WHERE id_emprestimo = $1`,
        [id_emprestimo]
    );
    
    return rows;
}

//Função responsável por remover um Emprestimo a partir de seu 'id_emprestimo'
exports.removerEmprestimoPeloId_emprestimo = async function(id_mprestimo){
    const {rows} = await db.query(
        `UPDATE emprestimo SET is_ativo = false WHERE id_emprestimo = '${id_emprestimo}'`
    );
    
    return rows;
}