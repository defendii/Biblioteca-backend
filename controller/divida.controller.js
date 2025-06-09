const dividaDAO = require("../model/divida.dao");

// Função responsável por listar todas as dividas
exports.listarDividas = async function(){
    return dividaDAO.listarDividas();
}

// Função responsável por criar uma nova divida
exports.criarDivida = async function(nova_divida){
    const erros = [];

    const user = await dividaDAO.procurarDividaPeloId_divida(nova_divida.id_divida);

    if(user.length != 0){
        erros.push("Erro: Divida já cadastrada!");
    }
    
    if(erros.length > 0){
        return erros;
    }

    await dividaDAO.criarDivida(nova_divida);
    return [];
}

// Função responsável por remover um usuário pelo 'id_divida'
exports.removerDivida = async function(id_divida){
    return await dividaDAO.removerDividaPeloId_divida(id_divida);
}