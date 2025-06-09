const categoria_do_livroDAO = require("../model/categoria_do_livro.dao");

// Função responsável por listar todas as categorias
exports.listarCategoriasDoLivro = async function(){
    return categoria_do_livroDAO.listarCategoriasDoLivro();
}

// Função responsável por criar uma nova categoria
exports.criarCategoriaDoLivro = async function(nova_categoria_do_livro){
    const erros = [];

    const user = await categoria_do_livroDAO.procurarCategoriaDoLivroPeloId_categoria_do_livro(nova_categoria_do_livro.id_categoria_do_livro);

    if(user.length != 0){
        erros.push("Erro: categoria do livro já cadastrado!");
    }
    
    if(erros.length > 0){
        return erros;
    }

    await categoria_do_livroDAO.criarCategoriaDoLivro(nova_categoria_do_livro);
    return [];
}

// Função responsável por remover um categoria pelo 'id_categoria'
exports.removerCategoriaDoLivro = async function(id_categoria_do_livro){
    return await categoria_do_livroDAO.removerCategoriaDoLivroPeloId_categoria_do_livro(id_categoria_do_livro);
}