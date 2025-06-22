const livroDAO = require("../model/livro.dao");
const categoriaDAO = require("../model/categoria_do_livro.dao")
const autorDAO = require("../model/autores_do_livro.dao")
const editoraDAO = require("../model/editora_do_livro.dao")
const path = require('path');
const fs = require('fs');
const { error } = require("console")

// Função responsável por listar todos oslivros
exports.listarLivros = async function(){
    return livroDAO.listarLivros();
}


// Função responsável por criar um novo livro
exports.criarLivro = async function(novo_livro){
    const erros = [];

    const livro = await livroDAO.procurarLivroPeloIsbn(novo_livro.isbn);

    if(livro.length != 0){
        erros.push("Erro: isbn já cadastrado!");
    }

    if(erros.length > 0){
        return erros;
    }

    const caminho = path.join(__dirname, '..', 'imagens/');
    const id_livro = await livroDAO.criarLivro(novo_livro);

    extensao_arquivo = novo_livro.imagem.name.split(".");

    novo_livro.imagem.mv(caminho+id_livro+'.'+extensao_arquivo.pop());

    return true;;
}

// Função responsável por remover um livro pelo 'id_livro'
exports.removerLivro = async function(id_livro){
    return await livroDAO.removerLivroPeloId_livro(id_livro);
}

exports.listarLivrosComAssociacoes = async function (req, res) {
  try {
    const livros = await livroDAO.listarLivros(); // já existente

    const livrosCompletos = await Promise.all(
      livros.map(async (livro) => {
        const autores = await autorDAO.listarAutoresDoLivroPorLivro(livro.id_livro);
        const categorias = await categoriaDAO.listarCategoriasDoLivro(livro.id_livro);
        const editora = await editoraDAO.listarEditoraDoLivro(livro.id_livro);

        return {
          ...livro,
          autores,
          categorias,
          editora,
        };
      })
    );

    res.json(livrosCompletos);
  } catch (erro) {
    console.error("Erro ao listar livros com associações:", erro);
    res.status(500).json({ erro: "Erro ao listar livros com associações" });
  }
  
};