const livroDAO = require("../model/livro.dao");
const categoriaDAO = require("../model/categoria_do_livro.dao")
const autorDAO = require("../model/autores_do_livro.dao")
const editoraDAO = require("../model/editora_do_livro.dao")
const path = require('path');
const fs = require('fs');
const { error } = require("console")


// Função responsável por listar todos oslivros
exports.listarLivros = async function () {
  const livros = await livroDAO.listarLivros()

  return livros;
}

function moverArquivo(file, destino) {
  return new Promise((resolve, reject) => {
    file.mv(destino, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

exports.criarLivro = async function (novo_livro) {
  const erros = [];

  // Verifica isbn duplicado
  const livroExistente = await livroDAO.procurarLivroPeloIsbn(novo_livro.isbn);
  if (livroExistente.length !== 0) {
    erros.push("Erro: isbn já cadastrado!");
    return { sucesso: false, erros };
  }

  const id_livro = await livroDAO.criarLivro(novo_livro);

  if (novo_livro.imagem) {
    const caminho = path.join(__dirname, '..', 'imagens/');
    const extensao_arquivo = novo_livro.imagem.name.split(".").pop();

    try {
      await moverArquivo(novo_livro.imagem, caminho + id_livro + '.' + extensao_arquivo);
    } catch (err) {
      console.error("Erro ao salvar imagem:", err);
    }
  }

  if (novo_livro.autores && Array.isArray(novo_livro.autores)) {
    for (const id_autorRaw of novo_livro.autores) {
      const id_autor = parseInt(id_autorRaw);
      const vinculoExistente = await autorDAO.procurarAutorPeloId_autorDoLivro(id_livro, id_autor);
      if (vinculoExistente && vinculoExistente.is_ativo === false) {
        await autorDAO.reativarAutorNoLivro(id_livro, id_autor);
      } else if (!vinculoExistente) {
        await autorDAO.adicionarAutorAoLivro({ id_livro, id_autor, is_ativo: true });
      }
    }
  }

  if (novo_livro.categorias && Array.isArray(novo_livro.categorias)) {
    for (const id_categoriaRaw of novo_livro.categorias) {
      const id_categoria = parseInt(id_categoriaRaw);
      try {
        await categoriaDAO.adicionarCategoriaAoLivro(id_livro, id_categoria);
      } catch (err) {
        if (!err.message.includes("categoria já associada")) {
          console.error(err);
        }
      }
    }
  }

  if (novo_livro.id_editora) {
    const id_editora = parseInt(novo_livro.id_editora);
    await editoraDAO.associarEditoraAoLivro(id_livro, id_editora);
  }

  return { sucesso: true, id_livro };
};



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

exports.removerLivro = async function (id_livro) {
  if (!id_livro) {
    throw new Error("id_livro não pode ser undefined");
  }
  return await livroDAO.removerLivroPeloId_livro(id_livro);
};



exports.buscarLivroCompletoPorId = async function(id_livro) {
  const livro = await livroDAO.procurarLivroPeloId(id_livro);
  if (!livro || livro.length === 0) return null;

  const autores = await livroDAO.buscarAutoresDoLivro(id_livro);
  const categorias = await livroDAO.buscarCategoriasDoLivro(id_livro);
  const editora = await livroDAO.buscarEditoraDoLivro(id_livro);

  return {
    ...livro[0],
    autores,
    categorias,
    editora,
  };
};
