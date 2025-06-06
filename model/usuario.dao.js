const db = require("../config/database");
const md5 = require('md5');

// Função responsável por listar todos os usuários
exports.listarUsuarios = async function(){
    const {rows} = await db.query("SELECT * FROM usuario WHERE isativo = true");
    return rows;
}

// Função responsável por criar um novo usuário
exports.criarUsuario = async function(novo_usuario){
    const resposta = await db.query(
        'INSERT INTO usuario (nome, registro_academico, data_nascimento, email, telefone, tipo, isativo) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [novo_usuario.nome, novo_usuario.registro_academico, novo_usuario.data_nascimento, novo_usuario.email, novo_usuario.telefone, novo_usuario.tipo, novo_usuario.isativo, true]
    );
    
    return "Usuário cadastrado com sucesso!";
}

//Função responsável por buscar um usuário a partir de seu 'registro_academico'
exports.procurarUsuarioPeloRegistro_academico = async function(registro_academico){
    const {rows} = await db.query(
        `SELECT * FROM usuario WHERE registro_academico = '${registro_academico}'`
    );
    
    return rows;
}

//Função responsável por remover um usuário a partir de seu 'id_usuario'
exports.removerUsuarioId_usuario = async function(id_usuario){
    const {rows} = await db.query(
        `UPDATE usuario SET isativo = false WHERE id_usuario = '${id_usuario}'`
    );
    
    return rows;
}