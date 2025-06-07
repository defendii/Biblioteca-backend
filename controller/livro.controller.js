const livroDAO = require("../model/livro.dao");

// Função responsável por listar todos os usuários
exports.listarLivros = async function(){
    return livroDAO.listarLivros();
}

// Função responsável por criar um novo usuário
exports.criarLivro = async function(novo_livro){
    const erros = [];

    const user = await livroDAO.procurarLivroPeloIsbn(novo_livro.isbn);

    if(user.length != 0){
        erros.push("Erro: isbn já cadastrado!");
    }
    
    if(erros.length > 0){
        return erros;
    }

    await livroDAO.criarLivro(novo_livro);
    return [];
}

// Função responsável por remover um usuário pelo 'id_livro'
exports.removerLivro = async function(id_livro){
    return await livroDAO.removerLivroPeloId_livro(id_livro);
}