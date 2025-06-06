const cursoDAO = require("../model/curso.dao");

// Função responsável por listar todos os usuários
exports.listarcursos = async function(){
    return cursoDAO.listarCursos();
}

// Função responsável por criar um novo usuário
exports.criarCurso = async function(novo_curso){
    const erros = [];

    const user = await cursoDAO.procurarCursoPeloId_curso(novo_curso.id_curso);

    if(user.length != 0){
        erros.push("Erro: curso já cadastrado!");
    }
    
    if(erros.length > 0){
        return erros;
    }

    await cursoDAO.criarCurso(novo_curso);
    return [];
}

// Função responsável por remover um usuário pelo 'id_curso'
exports.removerCurso = async function(id_curso){
    return await cursoDAO.removerCursoPeloId_curso(id_curso);
}