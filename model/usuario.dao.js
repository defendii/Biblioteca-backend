const db = require("../config/database");


exports.listarUsuarios = async function () {
    const { rows } = await db.query("SELECT * FROM usuario WHERE is_ativo = true ORDER BY nome");
    return rows;
}

// Função responsável por criar um novo usuário
exports.criarUsuario = async function (novo_usuario) {
    const { rows } = await db.query(
        `INSERT INTO usuario (nome, registro_academico, data_nascimento, email, telefone, tipo, is_ativo)
   VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_usuario`,
        [
            novo_usuario.nome,
            novo_usuario.registro_academico,
            novo_usuario.data_nascimento,
            novo_usuario.email,
            novo_usuario.telefone,
            novo_usuario.tipo,
            true
        ]
    );

    return rows[0];
}

//Função responsável por buscar um usuário a partir de seu 'registro_academico'



//Função responsável por remover um usuário a partir de seu 'id_usuario'
exports.removerUsuarioPeloId_usuario = async function (id_usuario) {
    const { rows } = await db.query(
        `UPDATE usuario SET is_ativo = false WHERE id_usuario = '${id_usuario}'`
    );

    return rows;
}

exports.procurarUsuarioPeloID = async function (id_usuario) {
    const { rows } = await db.query(
      "SELECT * FROM usuario WHERE id_usuario = $1",
      [id_usuario]
    );
  
    return rows[0];  
  }

exports.atualizarUsuarioPeloId = async function (usuario) {
    const queryUsuario = `
      UPDATE usuario
      SET nome = $1,
          registro_academico = $2,
          data_nascimento = $3,
          email = $4,
          telefone = $5,
          tipo = $6,
          is_ativo = $7
      WHERE id_usuario = $8
      RETURNING *;
    `;

    const valuesUsuario = [
        usuario.nome,
        usuario.registro_academico,
        usuario.data_nascimento,
        usuario.email,
        usuario.telefone,
        usuario.tipo,
        usuario.is_ativo,
        usuario.id_usuario
    ];

    const { rows } = await db.query(queryUsuario, valuesUsuario);

    await db.query(`UPDATE cursos_dos_usuarios SET is_ativo = false WHERE id_usuario = $1`, [usuario.id_usuario]);

    if (usuario.id_cursos && usuario.id_cursos.length > 0) {
        for (const id_curso of usuario.id_cursos) {
            const result = await db.query(
                `UPDATE cursos_dos_usuarios SET is_ativo = true WHERE id_usuario = $1 AND id_curso = $2 RETURNING *`,
                [usuario.id_usuario, id_curso]
            );
            if (result.rowCount === 0) {
                await db.query(
                    `INSERT INTO cursos_dos_usuarios (id_usuario, id_curso, is_ativo) VALUES ($1, $2, true)`,
                    [usuario.id_usuario, id_curso]
                );
            }
        }
    }

    return rows[0];
};



// Busca cursos associados a um usuário pelo id_usuario
exports.listarCursosDoUsuario = async function (id_usuario) {
    const query = `
    SELECT c.id_curso, c.nome
    FROM cursos_dos_usuarios cu
    JOIN curso c ON cu.id_curso = c.id_curso
    WHERE cu.id_usuario = $1 AND cu.is_ativo = true;
  `;
    const { rows } = await db.query(query, [id_usuario]);
    return rows;
};
