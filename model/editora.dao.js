const db = require("../config/database");

// Função responsável por listar todos os editoras
exports.listarEditoras = async function(){
    const {rows} = await db.query("SELECT * FROM editora WHERE is_ativo = true");
    return rows;
}

// Função responsável por criar um novo editora
exports.criarEditora = async function(novo_editora){
    const resposta = await db.query(
        'INSERT INTO editora (nome, is_ativo) VALUES ($1, $2)',
        [novo_editora.nome, true]
    );
    
    return "Editora cadastrado com sucesso!";
}

//Função responsável por buscar um editora a partir de seu 'id_editora'
exports.procurarEditoraPeloId_editora = async function(id_editora){
    const {rows} = await db.query(
       `SELECT * FROM editora WHERE id_editora = $1`,
        [id_editora]
    );
    
    return rows;
}

//Função responsável por remover um editora a partir de seu 'id_editora'
exports.removerEditoraPeloId_editora = async function(id_editora){
    const {rows} = await db.query(
        `UPDATE editora SET is_ativo = false WHERE id_editora = '${id_editora}'`
    );
    
    return rows;
}