const autoresDoLivroDAO = require("../model/autores.dao");

// Função responsável por listar todos os usuários
exports.listarCursoDosUsuarios = async function(id_usuario){
    return cursos_dos_usuariosDAO.listarCursoDosUsuarios(id_usuario);
}

// Função responsável por criar um novo usuário
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

// Função responsável por remover um autor do livro pelo 'id_autor'
exports.removerCursoDoUsario = async function(id_usuario, id_curso){
    return await cursos_dos_usuariosDAO.removerCursoPeloId_curso(id_usuario, id_curso);
}