const usuarioDAO = require("../model/usuario.dao");
const usuarioRN = require("../model/usuario.rn");
const cursos_dos_usuarios = require("./cursos_dos_usuarios.controller")

exports.listarUsuarios = async function () {
  const usuarios = await usuarioDAO.listarUsuarios();

  // Para cada usuário, buscar cursos associados e inserir na propriedade "cursos"
  for (const usuario of usuarios) {
    const cursos = await usuarioDAO.listarCursosDoUsuario(usuario.id_usuario);
    usuario.cursos = cursos;
  }

  return usuarios;
};
// Função responsável por criar um novo usuário
exports.criarUsuario = async function(novo_usuario){
    const erros = [];

    const user = await usuarioDAO.procurarUsuarioPeloRegistro_academico(novo_usuario.registro_academico);

    if (user.length !== 0){
        erros.push("Erro: registro acadêmico já cadastrado!");
        return { erros };
    }

    const resultado = await usuarioDAO.criarUsuario(novo_usuario);

    return { id_usuario: resultado.id_usuario };
};

// Função responsável por remover um usuário pelo 'id_usuario'
exports.removerUsuario = async function(id_usuario){
    return await usuarioDAO.removerUsuarioPeloId_usuario(id_usuario);
}

exports.atualizarUsuario = async function(usuario) {
    return await usuarioDAO.atualizarUsuarioPeloId(usuario);
}

exports.removerCursoDoUsuario = async function(id_usuario, id_curso) {
    //console.log("Chamando removerCursoDoUsuario com:", id_usuario, id_curso);
    return await cursos_dos_usuarios.removerCursoDoUsuario(id_usuario, id_curso);
};
