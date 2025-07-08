const emprestimoDAO = require("../model/emprestimo.dao");
const livroDAO = require("../model/livro.dao");
const usuarioDAO = require("../model/usuario.dao");
const dividaDAO = require("../model/divida.dao");
const enviarEmail = require('../config/email')

// Listar todos os empréstimos
exports.listarEmprestimo = async function () {
  return await emprestimoDAO.listarEmprestimo();
};

exports.emprestarLivro = async function (livro, usuario) {
  const dataEmprestimoBR = new Date(livro.data_emprestimo).toLocaleDateString("pt-BR");
  const dataDevolucaoBR = new Date(livro.data_devolucao).toLocaleDateString("pt-BR");

  const mensagem = `
Olá ${usuario.nome}!

Você realizou o empréstimo do livro "${livro.titulo}" no dia ${dataEmprestimoBR}.
O prazo de devolução é até ${dataDevolucaoBR}.

Por favor, devolva o livro até essa data para evitar multas.

Atenciosamente,
Equipe da Biblioteca AJL
  `;

  enviarEmail(usuario.email, `Empréstimo do livro "${livro.titulo}"`, mensagem);
  console.log("Enviando email para:", usuario.email);
}

exports.criarEmprestimo = async function (novo_emprestimo) {
  const erros = [];

  const usuario = await usuarioDAO.procurarUsuarioPeloRegistro_academico(novo_emprestimo.registro_academico);
  if (!usuario || usuario.length === 0) {
    erros.push("Usuário não encontrado.");
    return erros;
  }

  const tipoUsuario = (usuario[0].tipo || "").trim().toLowerCase();

  let diasPrazo;
  if (tipoUsuario === "professor") {
    diasPrazo = 30;
  } else if (tipoUsuario === "aluno") {
    diasPrazo = 14;
  } else {
    erros.push("Tipo de usuário inválido.");
    return erros;
  }

  // Ajuste para aceitar datas enviadas ou usar padrão
  let dataEmprestimo = novo_emprestimo.data_emprestimo
    ? new Date(novo_emprestimo.data_emprestimo)
    : new Date();

  let dataDevolucao;
  if (novo_emprestimo.data_devolucao) {
    dataDevolucao = new Date(novo_emprestimo.data_devolucao);
  } else {
    dataDevolucao = new Date(dataEmprestimo);
    dataDevolucao.setDate(dataEmprestimo.getDate() + diasPrazo);
  }

  const idLimpo = novo_emprestimo.id_livro.trim();

  const livrosCompletos = await livroDAO.procurarLivroPeloId(idLimpo);

  if (livrosCompletos.length === 0) {
    erros.push("Livro não encontrado.");
  } else {
    const livroCompleto = livrosCompletos[0];

    const emprestimosAtivos = await emprestimoDAO.contarEmprestimosAtivosPorLivro(livroCompleto.id_livro);
    if (emprestimosAtivos >= livroCompleto.qtde_disponivel) {
      erros.push("Todos os exemplares do livro estão emprestados.");
    }

    novo_emprestimo.id_livro = livroCompleto.id_livro;
  }

  if (erros.length > 0) {
    return erros;
  }

  novo_emprestimo.data_emprestimo = dataEmprestimo.toISOString().split("T")[0];
  novo_emprestimo.data_devolucao = dataDevolucao.toISOString().split("T")[0];

  await emprestimoDAO.criarEmprestimo(novo_emprestimo);

  const livroCompleto = await livroDAO.procurarLivroPeloId(novo_emprestimo.id_livro);
  const livro = livroCompleto[0];
  const usuarioCompleto = usuario[0];

  const tituloLivro = livro.titulo || livro.nome || "Título não encontrado";

  await exports.emprestarLivro({
    titulo: tituloLivro,
    data_emprestimo: novo_emprestimo.data_emprestimo,
    data_devolucao: novo_emprestimo.data_devolucao
  }, {
    nome: usuarioCompleto.nome,
    email: usuarioCompleto.email
  });

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

exports.listarEmprestimosDoUsuario = async function (id_usuario) {
  return await emprestimoDAO.listarEmprestimosDoUsuario(id_usuario);
};
