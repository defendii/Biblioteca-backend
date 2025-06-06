const db = require("../config/database");

// Função responsável por listar todos os autores
exports.listarAutores = async function(){
    const {rows} = await db.query("SELECT * FROM autores WHERE is_ativo = true");
    return rows;
}

// Função responsável por criar um novo autor
exports.criarAutor = async function(novo_autor){
    const resposta = await db.query(
        'INSERT INTO autores (nome_autor, is_ativo) VALUES ($1, $2)',
        [novo_autor.nome_autor, true]
    );
    
    return "Autor cadastrado com sucesso!";
}

//Função responsável por buscar um autor a partir de seu 'id_autor'
exports.procurarAutorPeloId_autor = async function(id_autor){
    const {rows} = await db.query(
       `SELECT * FROM autores WHERE id_autor = $1`,
        [id_autor]
    );
    
    return rows;
}

//Função responsável por remover um autor a partir de seu 'id_autor'
exports.removerAutorPeloId_autor = async function(id_autor){
    const {rows} = await db.query(
        `UPDATE autores SET is_ativo = false WHERE id_autor = '${id_autor}'`
    );
    
    return rows;
}