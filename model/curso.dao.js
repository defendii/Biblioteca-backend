const db = require("../config/database");

// Função responsável por listar todos os cursos
exports.listarCursos = async function(){
    const {rows} = await db.query("SELECT * FROM curso WHERE is_ativo = true");
    return rows;
}

// Função responsável por criar um novo curso
exports.criarCurso = async function(novo_curso){
    const resposta = await db.query(
        'INSERT INTO curso (nome, codigo, is_ativo) VALUES ($1, $2, $3)',
        [novo_curso.nome, novo_curso.codigo, true]
    );
    
    return "curso cadastrado com sucesso!";
}

//Função responsável por buscar um curso a partir de seu 'id_curso'
exports.procurarCursoPeloId_curso = async function(id_curso){
    const {rows} = await db.query(
       `SELECT * FROM curso WHERE id_curso = $1`,
        [id_curso]
    );
    
    return rows;
}

//Função responsável por remover um curso a partir de seu 'id_curso'
exports.removerCursoPeloId_curso = async function(id_curso){
    const {rows} = await db.query(
        `UPDATE curso SET is_ativo = false WHERE id_curso = '${id_curso}'`
    );
    
    return rows;
}