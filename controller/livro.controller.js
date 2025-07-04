const livroDAO = require("../model/livro.dao");
const categoriaDAO = require("../model/categoria_do_livro.dao")
const autorDAO = require("../model/autores_do_livro.dao")
const editoraDAO = require("../model/editora_do_livro.dao")
const path = require('path');
const fs = require('fs');
const { error } = require("console")

// Função responsável por listar todos oslivros
exports.listarLivros = async function () {
  // return livroDAO.listarLivros();
  const livros = await livroDAO.listarLivros()
  // for(const livro of livros){
  //   const categorias= await livroDAO.listarCategoriasDoLivro(livro.id_livro);

  // }

  return livros;
}

function inserirImagem(novo_livro) {

}


// Função responsável por criar um novo livro
exports.criarLivro = async function (novo_livro) {
  const erros = [];
  if (novo_livro.imagem != null && novo_livro.imagem != undefined) {

  }
  const livro = await livroDAO.procurarLivroPeloIsbn(novo_livro.isbn);

  if (livro.length != 0) {
    erros.push("Erro: isbn já cadastrado!");
  }

  if (erros.length > 0) {
    return erros;
  }
  const id_livro = await livroDAO.criarLivro(novo_livro);


  const caminho = path.join(__dirname, '..', 'imagens/')

  extensao_arquivo = novo_livro.imagem.name.split(".");

  await novo_livro.imagem.mv(caminho + id_livro + '.' + extensao_arquivo.pop(), (err) => {
    if (err) console.error("Erro ao salvar imagem:", err);
  });

  return true;
}

// Função responsável por remover um livro pelo 'id_livro'
exports.removerLivro = async function (id_livro) {
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

exports.atualizarLivro = async function (livro) {
  try {
    const id = livro.id_livro;
    let extensao = null;

    if (livro.imagem) {
      extensao = livro.imagem.name.split(".").pop();

      const caminho = path.join(__dirname, '..', 'imagens', `${id}.${extensao}`);

      await livro.imagem.mv(caminho, (err) => {
        if (err) console.error("Erro ao salvar imagem atualizada:", err);
      });

      livro.caminho_foto_capa = extensao;
    } else {
      const resultadoAnterior = await livroDAO.listarLivros();
      const livroExistente = resultadoAnterior.find(l => l.id_livro == id);
      livro.caminho_foto_capa = livroExistente?.caminho_foto_capa || null;
    }

    const resultado = await livroDAO.atualizarLivroPeloId(livro);
    return { livro: resultado };
  } catch (erro) {
    console.error("Erro no controller:", erro);
    throw erro;
  }
}
