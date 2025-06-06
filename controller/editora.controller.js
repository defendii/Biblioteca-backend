const editoraDAO = require("../model/editora.dao");

// Função responsável por listar todos os usuários
exports.listarEditoras = async function(){
    return editoraDAO.listarEditoras();
}

// Função responsável por criar um novo usuário
exports.criarEditora = async function(novo_editora){
    const erros = [];

    const user = await editoraDAO.procurarEditoraPeloId_editora(novo_editora.id_editora);

    if(user.length != 0){
        erros.push("Erro: editora já cadastrado!");
    }
    
    if(erros.length > 0){
        return erros;
    }

    await editoraDAO.criarEditora(novo_editora);
    return [];
}

// Função responsável por remover um usuário pelo 'id_editora'
exports.removerEditora = async function(id_editora){
    return await editoraDAO.removerEditoraPeloId_editora(id_editora);
}