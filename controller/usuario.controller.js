const usuarioDAO = require("../model/usuario.dao");
const usuarioRN = require("../model/usuario.rn");

// Função responsável por listar todos os usuários
exports.listarUsuarios = async function(){
    return usuarioDAO.listarUsuarios();
}

// Função responsável por criar um novo usuário
exports.criarUsuario = async function(novo_usuario){
    const erros = [];

    const user = await usuarioDAO.procurarUsuarioPeloRegistro_academico(novo_usuario.removerUsuario);

    if(user.length != 0){
        erros.push("Erro: username já cadastrado!");
    }
    
    if(erros.length > 0){
        return erros;
    }

    await usuarioDAO.criarUsuario(novo_usuario);
    return [];
}

// Função responsável por remover um usuário pelo 'username'
exports.removerUsuario = async function(username){
    return await usuarioDAO.removerUsuarioPeloUsername(username);
}