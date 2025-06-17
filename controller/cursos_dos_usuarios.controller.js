const cursos_dos_usuariosDAO = require("../model/cursos_dos_usuarios.dao");

exports.listarCursoDosUsuarios = async function(id_usuario){
    return await cursos_dos_usuariosDAO.listarCursosDosUsuarios(id_usuario);
}

exports.adicionarCursoAoUsuario = async function(id_usuario, id_curso){
    const erros = [];

    const cursos = await cursos_dos_usuariosDAO.listarCursosDosUsuarios(id_usuario);
    const jaCadastrado = cursos.some(curso => curso.id_curso === id_curso);

    if (jaCadastrado) {
        erros.push("Erro: curso já associado a este usuário!");
    }

    if (erros.length > 0) {
        return erros;
    }

    await cursos_dos_usuariosDAO.adicionarCursoAoUsuario(id_usuario, id_curso);
    return [];
}

exports.removerCursoDoUsuario = async function(id_usuario, id_curso){
    //console.log("Controller: id_usuario =", id_usuario, "id_curso =", id_curso);
    return await cursos_dos_usuariosDAO.removerCursoPeloId_curso(id_usuario, id_curso);
}
