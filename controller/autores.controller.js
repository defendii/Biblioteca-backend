const autoresDAO = require("../model/autores.dao");

// Função responsável por listar todos os usuários
exports.listarAutores = async function(){
    return autoresDAO.listarAutores();
}

// Função responsável por criar um novo usuário
exports.criarAutor = async function(novo_autor){
    const erros = [];

    const user = await autoresDAO.procurarAutorPeloId_autor(novo_autor.id_autor);

    if(user.length != 0){
        erros.push("Erro: autor já cadastrado!");
    }
    
    if(erros.length > 0){
        return erros;
    }

    await autoresDAO.criarAutor(novo_autor);
    return [];
}

// Função responsável por remover um usuário pelo 'id_autor'
exports.removerAutor = async function(id_autor){
    return await autoresDAO.removerAutorPeloId_autor(id_autor);
}