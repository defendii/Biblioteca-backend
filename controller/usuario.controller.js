const usuarioDAO = require("../model/usuario.dao");
const usuarioRN = require("../model/usuario.rn");

// Função responsável por listar todos os usuários
exports.listarUsuarios = async function(){
    return usuarioDAO.listarUsuarios();
}

// Função responsável por criar um novo usuário
exports.criarUsuario = async function(novo_usuario){
    const erros = [];

    const user = await usuarioDAO.procurarUsuarioPeloRegistro_academico(novo_usuario.registro_academico);

    if(user.length != 0){
        erros.push("Erro: registro acadêmico já cadastrado!");
    }
    
    if(erros.length > 0){
        return erros;
    }

    await usuarioDAO.criarUsuario(novo_usuario);
    return [];
}

// Função responsável por remover um usuário pelo 'id_usuario'
exports.removerUsuario = async function(id_usuario){
    return await usuarioDAO.removerUsuarioPeloId_usuario(id_usuario);
}

exports.atualizarUsuario = async function(usuario) {
    return await usuarioDAO.atualizarUsuarioPeloId(usuario);
  }