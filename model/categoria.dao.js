const db = require("../config/database");

// Função responsável por listar todos os categorias
exports.listarCategorias = async function(){
    const {rows} = await db.query("SELECT * FROM categoria WHERE is_ativo = true");
    return rows;
}

// Função responsável por criar um novo categoria
exports.criarCategoria = async function(novo_categoria){
    const resposta = await db.query(
        'INSERT INTO categoria (nome_categoria, is_ativo) VALUES ($1, $2)',
        [novo_categoria.nome_categoria, true]
    );
    
    return "categoria cadastrado com sucesso!";
}

//Função responsável por buscar um categoria a partir de seu 'id_categoria'
exports.procurarCategoriaPeloId_categoria = async function(id_categoria){
    const {rows} = await db.query(
       `SELECT * FROM categoria WHERE id_categoria = $1`,
        [id_categoria]
    );
    
    return rows;
}

//Função responsável por remover um categoria a partir de seu 'id_categoria'
exports.removerCategoriaPeloId_categoria = async function(id_categoria){
    const {rows} = await db.query(
        `UPDATE categoria SET is_ativo = false WHERE id_categoria = '${id_categoria}'`
    );
    
    return rows;
}