const db = require("../config/database");

// Função responsável por listar todas as categorias do livro
exports.listarCategoriaDoLivro = async function(){
    const {rows} = await db.query("SELECT * FROM categoria_do_livro WHERE is_ativo = true");
    return rows;
}

// Função responsável por criar uma nova categoria do livro
exports.criarCategoriaDoLivro = async function(nova_categoria_do_livro){
    const resposta = await db.query(
        'INSERT INTO categoria_do_livro (id_livro, id_categoria, is_ativo) VALUES ($1, $2, $3)',
        [nova_categoria_do_livro.id_livro, nova_categoria_do_livro.id_categoria, true]
    );
    
    return "Categoria do livro cadastrado com sucesso!";
}

//Função responsável por buscar uma categoria do livro a partir de seu 'id_categoria'
exports.procurarCategoriaDoLivroPeloid_categoria = async function(id_categoria){
    const {rows} = await db.query(
       `SELECT livro.id, categoria.id AS categoria
        FROM livro
        JOIN categorias ON livros.categoria_id = categorias.id;`,
        [id_livro], [id_categoria]
    );
    
    return rows;
}

//Função responsável por remover um autor a partir de seu 'id_autor'
exports.removerCategoriaDoLivroPeloId_categoria_do_livro = async function(id_autor){
    const {rows} = await db.query(
        `UPDATE categoria_do_livro SET is_ativo = false WHERE id_categoria_do_livro = '${id_categoria_do_livro}'`
    );
    
    return rows;
}