const emprestimoDAO = require("../model/emprestimo.dao");
const livroDAO = require("../model/livro.dao");
const usuarioDAO = require("../model/usuario.dao");
const dividaDAO = require("../model/divida.dao");

// Listar todos os empréstimos
exports.listarEmprestimo = async function () {
  return await emprestimoDAO.listarEmprestimo();
};

// Criar empréstimo com validações
exports.criarEmprestimo = async function (novo_emprestimo) {
  const erros = [];

  // Verifica se o usuário existe e seu tipo
  const usuario = await usuarioDAO.procurarUsuarioPeloId(novo_emprestimo.id_usuario);
  if (!usuario || usuario.length === 0) {
    erros.push("Usuário não encontrado.");
    return erros;
  }

  const tipoUsuario = usuario[0].tipo.toLowerCase(); // "aluno" ou "professor"

  // Define prazo de devolução
  const hoje = new Date();
  const diasPrazo = tipoUsuario === "professor" ? 30 : 14;
  const dataDevolucao = new Date(hoje);
  dataDevolucao.setDate(hoje.getDate() + diasPrazo);

  // Verifica se o livro existe (pelo ISBN)
  const livros = await livroDAO.ProcurarLivroPeloIsbn(novo_emprestimo.id_livro);
  if (livros.length === 0) {
    erros.push("Livro não encontrado.");
  } else {
    const livro = livros[0];

    // Verifica disponibilidade do livro
    const emprestimosAtivos = await emprestimoDAO.contarEmprestimosAtivosPorLivro(livro.id_livro);
    if (emprestimosAtivos >= livro.qtde_disponivel) {
      erros.push("Todos os exemplares do livro estão emprestados.");
    }

    // Ajusta o id_livro real para inserir no banco
    novo_emprestimo.id_livro = livro.id_livro;
  }

  if (erros.length > 0) {
    return erros;
  }

  // Atribui data atual e data de devolução automática
  novo_emprestimo.data_emprestimo = hoje.toISOString().split("T")[0];
  novo_emprestimo.data_devolucao = dataDevolucao.toISOString().split("T")[0];

  await emprestimoDAO.criarEmprestimo(novo_emprestimo);
  return [];
};

// Remover empréstimo e gerar dívida se necessário
exports.removerEmprestimo = async function (id_emprestimo) {
  const emprestimos = await emprestimoDAO.procurarEmprestimoPeloId_emprestimo(id_emprestimo);
  if (emprestimos.length === 0) {
    return { erro: "Empréstimo não encontrado." };
  }

  const emprestimo = emprestimos[0];
  if (!emprestimo.is_ativo) {
    return { erro: "Empréstimo já está inativo." };
  }

  // Verifica se há atraso
  const hoje = new Date();
  const dataDevolucao = new Date(emprestimo.data_devolucao);
  let diasAtraso = Math.floor((hoje - dataDevolucao) / (1000 * 60 * 60 * 24));
  if (diasAtraso > 0) {
    const valorMulta = diasAtraso * 1;
    await dividaDAO.criarDivida({
      id_emprestimo: id_emprestimo,
      valor_multa: valorMulta,
      dia_atual: hoje.toISOString().split("T")[0],
      is_ativo: true,
    });
  }

  return await emprestimoDAO.removerEmprestimoPeloId_emprestimo(id_emprestimo);
};
