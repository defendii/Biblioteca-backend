const categoriaDAO = require("../model/categoria.dao");

// Função responsável por listar todas as categorias
exports.listarCategorias = async function(){
    return categoriaDAO.listarCategorias();
}

// Função responsável por criar uma nova categoria
exports.criarCategoria = async function(novo_categoria){
    const erros = [];

    const user = await categoriaDAO.procurarCategoriaPeloId_categoria(novo_categoria.id_categoria);

    if(user.length != 0){
        erros.push("Erro: categoria já cadastrado!");
    }
    
    if(erros.length > 0){
        return erros;
    }

    await categoriaDAO.criarCategoria(novo_categoria);
    return [];
}

// Função responsável por remover um categoria pelo 'id_categoria'
exports.removerCategoria = async function(id_categoria){
    return await categoriaDAO.removerCategoriaPeloId_categoria(id_categoria);
}