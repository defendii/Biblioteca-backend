const db = require("../config/database");

// Função responsável por listar todos os bibliotecarios
exports.listarBibliotecario = async function(){
    const {rows} = await db.query("SELECT * FROM bibliotecario WHERE is_ativo = true");
    return rows;
}

// Função responsável por criar um novo bibliotecario
exports.criarBibliotecario = async function(novo_bibliotecario){
    const resposta = await db.query(
        'INSERT INTO bibliotecario (login, senha, is_ativo) VALUES ($1, $2, $3)',
        [novo_bibliotecario.login, novo_bibliotecario.senha, true]
    );
    
    return "bibliotecario cadastrado com sucesso!";
}

//Função responsável por buscar um bibliotecario a partir de seu 'id_bibliotecario'
exports.procurarBibliotecarioPeloId_bibliotecario = async function(id_bibliotecario){
    const {rows} = await db.query(
       `SELECT * FROM bibliotecario WHERE id_bibliotecario = $1`,
        [id_bibliotecario]
    );
    
    return rows;
}

//Função responsável por remover um bibliotecario a partir de seu 'id_bibliotecario'
exports.removerBibliotecarioPeloId_bibliotecario = async function(id_bibliotecario){
    const {rows} = await db.query(
        `UPDATE bibliotecario SET is_ativo = false WHERE id_bibliotecario = '${id_bibliotecario}'`
    );
    
    return rows;
}

//Função responsável por buscar um bibliotecario a partir de seu 'login'
exports.procurarBibliotecarioPeloLogin = async function(login){
    const {rows} = await db.query(
       `SELECT * FROM bibliotecario WHERE login = $1`,
        [login]
    );
    
    return rows;
}
