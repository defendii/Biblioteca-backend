const bibliotecarioDAO = require("../model/bibliotecario.dao");

// Função responsável por listar todos os bibliotecarios
exports.listarBibliotecario = async function(){
    return bibliotecarioDAO.listarBibliotecario();
}

// Função responsável por criar um novo bibliotecario
exports.criarBibliotecario= async function(novo_bibliotecario){
    const erros = [];

    const user = await bibliotecarioDAO.procurarBibliotecarioPeloId_bibliotecario(novo_bibliotecario.id_bibliotecario);

    if(user.length != 0){
        erros.push("Erro: Bibliotecario já cadastrado!");
    }
    
    if(erros.length > 0){
        return erros;
    }

    await bibliotecarioDAO.criarBibliotecario(novo_bibliotecario);
    return [];
}

// Função responsável por remover um bibliotecario pelo 'id_Bibliotecario'
exports.removerBibliotecario= async function(id_bibliotecario){
    return await bibliotecarioDAO.removerBibliotecarioPeloId_bibliotecario(id_bibliotecario);
}

exports.buscarBibliotecarioPeloLogin= async function(login){
    return await bibliotecarioDAO.buscarBibliotecarioPeloLogin(login);
}
