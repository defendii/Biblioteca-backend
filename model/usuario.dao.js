const db = require("../config/database");

// Função responsável por listar todos os usuários
exports.listarUsuarios = async function () {
    const { rows } = await db.query("SELECT * FROM usuario WHERE is_ativo = true");
    return rows;
}

// Função responsável por criar um novo usuário
exports.criarUsuario = async function (novo_usuario) {
    const resposta = await db.query(
        'INSERT INTO usuario (nome, registro_academico, data_nascimento, email, telefone, tipo, is_ativo) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [novo_usuario.nome, novo_usuario.registro_academico, novo_usuario.data_nascimento, novo_usuario.email, novo_usuario.telefone, novo_usuario.tipo, true]
    );

    return "Usuário cadastrado com sucesso!";
}

//Função responsável por buscar um usuário a partir de seu 'registro_academico'
exports.procurarUsuarioPeloId = async function (id_usuario) {
    const query = `SELECT * FROM usuario WHERE id_usuario = $1`;
    const { rows } = await db.query(query, [id_usuario]);
    return rows[0] || null;
};

//Função responsável por remover um usuário a partir de seu 'id_usuario'
//exports.removerUsuarioPeloId_usuario = async function (id_usuario) {
//    const { rows } = await db.query(
//        `UPDATE usuario SET is_ativo = false WHERE id_usuario = '${id_usuario}'`
//    );

//    return rows;
//}

exports.removerUsuarioPeloId_usuario = async function (id_usuario) {
    const query = `UPDATE usuario SET is_ativo = false WHERE id_usuario = $1`; // se for PostgreSQL
    const { rows } = await db.query(query, [id_usuario]);

    return rows;
};

exports.atualizarUsuarioPeloId = async function (usuario) {
    const query = `
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

    const values = [
        usuario.nome,
        usuario.registro_academico,
        usuario.data_nascimento,
        usuario.email,
        usuario.telefone,
        usuario.tipo.toLowerCase(),
        usuario.is_ativo !== undefined && usuario.is_ativo !== null ? usuario.is_ativo : true, // padrão true
        usuario.id_usuario
    ];




    const { rows } = await db.query(query, values);
    return rows[0];
}