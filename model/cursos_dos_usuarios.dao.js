const db = require("../config/database");


exports.listarCursosDosUsuarios = async function (id_usuario) {
    const { rows } = await db.query(
        `SELECT c.*
         FROM curso c
         INNER JOIN cursos_dos_usuarios d ON c.id_curso = d.id_curso
         WHERE d.id_usuario = $1 AND d.is_ativo = true`,
        [id_usuario]
    );
    return rows;
}

exports.adicionarCursoAoUsuario = async function (id_usuario, id_curso) {
    const vinculo = await this.buscarVinculoCursoUsuario(id_usuario, id_curso);

    if (vinculo) {
        if (vinculo.is_ativo === false || vinculo.is_ativo === null) {
            await db.query(
                `UPDATE cursos_dos_usuarios 
                 SET is_ativo = true 
                 WHERE id_usuario = $1 AND id_curso = $2`,
                [id_usuario, id_curso]
            );
            return "Curso reativado com sucesso!";
        } else {
            throw new Error("Erro: curso já associado a este usuário!");
        }
    }

    await db.query(
        `INSERT INTO cursos_dos_usuarios (id_usuario, id_curso, is_ativo)
         VALUES ($1, $2, true)`,
        [id_usuario, id_curso]
    );
    return "Curso associado ao usuário com sucesso!";
}

exports.removerCursoPeloId_curso = async function (id_usuario, id_curso) {
    await db.query(
        `UPDATE cursos_dos_usuarios 
        SET is_ativo = false 
        WHERE id_usuario = $1 AND id_curso = $2`,
        [id_usuario, id_curso]
    );
    return "Curso removido do usuário com sucesso!";
}

exports.buscarVinculoCursoUsuario = async function (id_usuario, id_curso) {
    const { rows } = await db.query(
        `SELECT * FROM cursos_dos_usuarios 
          WHERE id_usuario = $1 AND id_curso = $2`,
        [id_usuario, id_curso]
    );
    return rows[0]; 
}


