const emprestimoDAO = require("../model/emprestimo.dao");

// Função responsável por listar todos os emprestimos
exports.listarEmprestimo = async function () {
    return await emprestimoDAO.listarEmprestimo
    ();
  };

// Função responsável por criar um novo emprestimo
exports.criarEmprestimo = async function(novo_emprestimo){
    const erros = [];

    const user = await emprestimoDAO.procurarEmprestimoPeloId_emprestimo(novo_emprestimo.id_emprestimo);

    if(user.length != 0){
        erros.push("Erro: emprestimo já cadastrado!");
    }
    
    if(erros.length > 0){
        return erros;
    }

    await emprestimoDAO.criarEmprestimo(novo_emprestimo);
    return [];
}

// Função responsável por remover um emprestimo pelo 'id_emprestimo'
exports.removerEmprestimo = async function(id_emprestimo){
    return await emprestimoDAO.removerEmprestimoPeloId_emprestimo(id_emprestimo);
}
