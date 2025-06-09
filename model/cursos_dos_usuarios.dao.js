const db = require("../config/database");

// Função responsável por listar todos os cursos
exports.listarCursosDosUsuarios = async function(){
    const { rows } = await db.query(
        `SELECT c.*
         FROM curso c
         INNER JOIN cursos_dos_usuarios d ON c.id_curso = d.id_curso
         WHERE cu.id_usuario = $1`,
        [id_usuario]
    );
    return rows;
}

// Função responsável por criar um novo curso
exports.adicionarCursoAoUsuario = async function(novo_curso){
    await db.query(
        `INSERT INTO cursos_dos_usuarios (id_usuario, id_curso)
         VALUES ($1, $2)`
        [id_usuario, id_curso]
    );
    return "Curso associado ao usuário com sucesso!";
    
}

//Função responsável por buscar um curso a partir de seu 'id_curso'
// exports.procurarCursosDosUsuariosDoPeloId_curso = async function(id_curso){
//     const {rows} = await db.query(
//        `SELECT * FROM curso WHERE id_curso = $1`,
//         [id_curso]
//     );
    
//     return rows;
// }

//Função responsável por remover um curso a partir de seu 'id_curso'
exports.removerCursoPeloId_curso = async function(id_curso){
    await db.query(
        `DELETE FROM cursos_dos_usuarios
         WHERE id_usuario = $1 AND id_curso = $2`,
        [id_usuario, id_curso]
    );
    return "Curso removido do usuário com sucesso!";
}