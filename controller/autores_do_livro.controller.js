const autoresDoLivroDAO = require("../model/autores.dao");

// Função responsável por listar todos os usuários
exports.listarAutoresDoLivro = async function(){
    return autoresDAO.listarAutoresDoLivro();
}

// Função responsável por criar um novo usuário
exports.criarAutorDoLivro = async function(novo_autorDoLivro){
    const erros = [];

    const user = await autoresDAO.procurarAutorPeloId_autorDoLivro(novo_autorDoLivro.id_autorDoLivro);

    if(user.length != 0){
        erros.push("Erro: autor do livro já cadastrado!");
    }
    
    if(erros.length > 0){
        return erros;
    }

    await autoresDAO.criarAutorDoLivro(novo_autor);
    return [];
}

// Função responsável por remover um autor do livro pelo 'id_autor'
exports.removerAutor = async function(id_autor){
    return await autoresDAO.removerAutorPeloId_autor(id_autor);
}