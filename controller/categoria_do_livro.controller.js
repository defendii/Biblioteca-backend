const categoriasDAO = require("../model/categoria_do_livro.dao");

exports.listarCategoriasDoLivro = async function(id_livro) {
  return await categoriasDAO.listarCategoriasDoLivro(id_livro);
}

exports.adicionarCategoriaAoLivro = async function (req, res) {
  try {
    const { id_livro, id_categoria } = req.body;

    if (id_livro == null || id_categoria == null) {
      return res.status(400).json({ erro: "id_livro ou id_categoria ausente" });
    }

    const erros = await exports.adicionarCategoriaAoLivroPorIds(id_livro, id_categoria);

    if (erros.length > 0) {
      return res.status(400).json({ erro: erros });
    }

    res.json({ sucesso: true });

  } catch (erro) {
    console.error("Erro ao associar categoria:", erro);
    return res.status(500).json({ erro: "Erro ao associar categoria" });
  }
}

exports.adicionarCategoriaAoLivroPorIds = async function(id_livro, id_categoria) {
  const vinculo = await categoriasDAO.buscarVinculoCategoriaLivro(id_livro, id_categoria);

  if (vinculo && vinculo.is_ativo === true) {
    return ["Categoria já associada a este livro!"];
  }

  await categoriasDAO.adicionarCategoriaAoLivro(id_livro, id_categoria);
  return [];
}


exports.removerCategoriaDoLivro = async function(id_livro, id_categoria) {
  return await categoriasDAO.removerCategoriaDoLivro(id_livro, id_categoria);
}
