const db = require("../config/database");

// Função responsável por listar todas as dividas
exports.listarDividas = async function(){
    const {rows} = await db.query("SELECT * FROM divida WHERE is_ativo = true");
    return rows;
}

// Função responsável por criar um novo divida
exports.criarDivida = async function(nova_divida){
    const resposta = await db.query(
        'INSERT INTO divida (id_emprestimo, valor_multa, dia_atual, is_ativo) VALUES ($1, $2, $3, $4)',
        [nova_divida.id_emprestimo, nova_divida.valor_multa, nova_divida.dia_atual , true]
    );
    
    return "Divida cadastrado com sucesso!";
}

//Função responsável por buscar uma divida a partir de seu 'id_divida'
exports.procurarDividaPeloId_divida = async function(id_divida){
    const {rows} = await db.query(
       `SELECT * FROM divida WHERE id_divida = $1`,
        [id_divida]
    );
    
    return rows;
}

//Função responsável por remover uma divida a partir de seu 'id_divida'
exports.removerDividaPeloId_divida = async function(id_divida){
    const {rows} = await db.query(
        `UPDATE divida SET is_ativo = false WHERE id_divida = '${id_divida}'`
    );
    
    return rows;
}

exports.procurarDividaPorIdEmprestimo = async function(id_emprestimo){
  const { rows } = await db.query(
    `SELECT * FROM divida WHERE id_emprestimo = $1 AND is_ativo = true`,
    [id_emprestimo]
  );
  return rows;
};

exports.marcarDividaComoPaga = async function (id_emprestimo) {
  await db.query(
    `UPDATE divida SET foi_pago = true WHERE id_emprestimo = $1`,
    [id_emprestimo]
  );
};