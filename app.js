const express = require('express');
const app = express();
const port = 3333;
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const cors = require('cors');

//Adicionar Bootstrap
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'))

const usuarioController = require('./controller/usuario.controller');
const autoresController = require('./controller/autores.controller');
const editoraController = require('./controller/editora.controller');
const cursoController = require('./controller/curso.controller');
const categoriaController = require('./controller/categoria.controller');
const livroController = require('./controller/livro.controller');
const emprestimoController = require('./controller/emprestimo.controller');
const dividaController = require('./controller/divida.controller');
const categoria_do_livroController = require('./controller/categoria_do_livro.controller');
const cursosUsuariosController = require('./controller/cursos_dos_usuarios.controller');
const usuario = require('./entidades/usuario');
const autores = require('./entidades/autores');
const editora = require('./entidades/editora');
const curso = require('./entidades/curso');
const categoria = require('./entidades/categoria');
const livro = require('./entidades/livro');
const emprestimo = require('./entidades/emprestimo')
const divida = require('./entidades/divida');
const categoria_do_livro = require('./entidades/categoria_do_livro');

//Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

//Configuração express-fileupload
app.use(fileupload());

//Necessário apenas quando for listas
app.use('/imagens', express.static('./imagens'));

app.get('/', function (req, res) {

});


// usuario
app.get('/listarUsuarios', function (req, res) {
  usuarioController.listarUsuarios()
  .then(resp => {
    res.json(resp); 
  })
  .catch(erro => {
    console.error("Erro ao listar usuários:", erro);
    res.status(500).json({ erro: 'Erro ao buscar usuários' });
  });
});

app.post('/cadastrarUsuario', function (req, res) {
  const novo_usuario = new usuario(null, req.body.nome, req.body.registro_academico, req.body.data_nascimento, req.body.email, req.body.telefone, req.body.tipo, req.body.is_ativo);

  usuarioController.criarUsuario(novo_usuario)
    .then(resp => {
      res.json({ mensagem: resp });
    })
    .catch(err => {
      res.status(500).json({ error: 'Erro ao cadastrar usuário', err });
    });

});

app.post('/removerUsuario', function (req, res) {
  const resultado = usuarioController.removerUsuario(req.body.id_usuario);
  resultado
    .then(resp => { 
      res.redirect('/listarUsuarios'); 
    })
    .catch(err => {
      console.error('Erro ao remover usuário:', err);
      res.status(500).json({ error: 'Erro ao remover usuário', err });
    });
});

app.put('/atualizarUsuario', function (req, res) {
  const usuarioAtualizado = new usuario(
    req.body.id_usuario,
    req.body.nome,
    req.body.registro_academico,
    req.body.data_nascimento,
    req.body.email,
    req.body.telefone,
    req.body.tipo,
    req.body.is_ativo
  );

  usuarioController.atualizarUsuario(usuarioAtualizado)
    .then(resp => {
      if (!resp) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado para atualização.' });
      }
      res.json({ mensagem: 'Usuário atualizado com sucesso!', usuario: resp });
    })
    .catch(err => {
      console.error('Erro ao atualizar usuário:', err);
      res.status(500).json({ error: 'Erro ao atualizar usuário', err });
    });
});


//autores
app.get('/listarAutores', function (req, res) {
  const resp = usuarioController.listarAutores();
  res.json(resp);  // Retorna a lista de autores em JSON
});

app.get('/cadastrarAutor', function (req, res) {
  res.json({ mensagem: "Aqui deveria estar o formulário para cadastrar autor" });
});

app.post('/cadastrarAutor', function (req, res) {
  const novo_autor = new autores(null, req.body.nome_autor, req.body.is_ativo);

  autoresController.criarAutor(novo_autor)
    .then(resp => {
      res.json({ mensagem: resp });
    })
    .catch(err => {
      res.status(500).json({ error: 'Erro ao cadastrar autor' });
    });

});

app.post('/removerAutores', function (req, res) {
  const resultado = autoresController.removerAutor(req.query.id_autor);
  resultado.then(resp => { res.redirect('/listarAutores'); });
});


// editora
app.get('/listarEditoras', function (req, res) {
  const resp = usuarioController.listarEditoras();
  res.json(resp);  // Retorna a lista de editoras em JSON
});

app.get('/cadastrarEditora', function (req, res) {
  res.json({ mensagem: "Aqui deveria estar o formulário para cadastrar editora" });
});

app.post('/cadastrarEditora', function (req, res) {
  const novo_editora = new editora(null, req.body.nome, req.body.is_ativo);

  editoraController.criarEditora(novo_editora)
    .then(resp => {
      res.json({ mensagem: resp });
    })
    .catch(err => {
      console.error("Erro ao cadastrar editora:", err);
      res.status(500).json({ error: 'Erro ao cadastrar editora' });
    });

});

app.post('/removerEditora', function (req, res) {
  const resultado = editoraController.removerEditora(req.query.id_editora);
  resultado.then(resp => { res.redirect('/listarEditoras'); });
});


// curso
app.get('/listarCursos', function (req, res) {
  const resp = usuarioController.listarCursos();
  res.json(resp);  // Retorna a lista de cursos em JSON
});

app.get('/cadastrarCurso', function (req, res) {
  res.json({ mensagem: "Aqui deveria estar o formulário para cadastrar curso" });
});

app.post('/cadastrarCurso', function (req, res) {
  const novo_curso = new curso(null, req.body.nome, req.body.codigo, req.body.is_ativo);

  cursoController.criarCurso(novo_curso)
    .then(resp => {
      res.json({ mensagem: resp });
    })
    .catch(err => {
      console.error("Erro ao cadastrar curso:", err);
      res.status(500).json({ error: 'Erro ao cadastrar curso' });
    });

});

app.post('/removerCurso', function (req, res) {
  const resultado = cursoController.removerCurso(req.query.id_curso);
  resultado.then(resp => { res.redirect('/listarCursos'); });
});


//categoria
app.get('/listarCategorias', function (req, res) {
  const resp = usuarioController.listarCategorias();
  res.json(resp);  // Retorna a lista de categorias em JSON
});

app.get('/cadastrarCategoria', function (req, res) {
  res.json({ mensagem: "Aqui deveria estar o formulário para cadastrar categoria" });
});

app.post('/cadastrarCategoria', function (req, res) {
  const nova_categoria = new categoria(null, req.body.nome_categoria, req.body.is_ativo);

  categoriaController.criarCategoria(nova_categoria)
    .then(resp => {
      res.json({ mensagem: resp });
    })
    .catch(err => {
      res.status(500).json({ error: 'Erro ao cadastrar categoria', err });
    });

});

app.post('/removerCategoria', function (req, res) {
  const resultado = autoresController.removerCategoria(req.query.id_categoria);
  resultado.then(resp => { res.redirect('/listarCategoria'); });
});


// livro
app.get('/listarLivros', async function (req, res) {
  livroController.listarLivros()
  .then(resp => {
    res.json(resp); 
  })
  .catch(erro => {
    console.error("Erro ao listar livros:", erro);
    res.status(500).json({ erro: 'Erro ao buscar livros' });
  });
});



app.get('/cadastrarLivro', function (req, res) {
  res.json({ mensagem: "Aqui deveria estar o formulário para cadastrar livro" });
});

app.post('/cadastrarLivro', function (req, res) {
  const novo_livro = new livro(null, req.body.titulo, req.body.qtde_disponivel, req.body.isbn, req.body.edicao, req.body.caminho_foto_capa, req.body.is_ativo);

  livroController.criarLivro(novo_livro)
    .then(resp => {
      res.json({ mensagem: resp });
    })
    .catch(err => {
      res.status(500).json({ error: 'Erro ao cadastrar livro', err });
    });

});

app.post('/removerLivro', function (req, res) {
  const resultado = livroController.removerLivro(req.query.username);
  resultado.then(resp => { res.redirect('/listarLivros'); });
});



//emprestimo
app.get('/listar', function (req, res) {
  const resp = usuarioController.listarEmprestimo();
  res.json(resp);  // Retorna a lista de  em JSON
});

app.get('/cadastrarEmprestimo', function (req, res) {
  res.json({ mensagem: "Aqui deveria estar o formulário para cadastrar Emprestimo" });
});

app.post('/cadastrarEmprestimo', function (req, res) {
  const novo_emprestimo = new emprestimo(null, req.body.id_usuario, req.body.id_livro, req.body.data_emprestimo, req.body.data_devolucao, req.body.is_ativo);

  emprestimoController.criarEmprestimo(novo_emprestimo)
    .then(resp => {
      res.json({ mensagem: resp });
    })
    .catch(err => {
      console.error("Erro ao cadastrar emprestimo:", err);
      res.status(500).json({ error: 'Erro ao cadastrar emprestimo' });
    });

});

app.post('/removerEmprestimo', function (req, res) {
  const resultado = emprestimoController.removerEmprestimo(req.query.id_emprestimo);
  resultado.then(resp => { res.redirect('/listar'); });
});



//divida
app.get('/listar', function (req, res) {
  const resp = usuarioController.listarDivida();
  res.json(resp);  // Retorna a lista de  em JSON
});

app.get('/cadastrarDivida', function (req, res) {
  res.json({ mensagem: "Aqui deveria estar o formulário para cadastrar Divida" });
});

app.post('/cadastrarDivida', function (req, res) {
  const nova_divida = new divida(null, req.body.id_emprestimo, req.body.valor_multa, req.body.dia_atual, req.body.is_ativo);

  dividaController.criarDivida(nova_divida)
    .then(resp => {
      res.json({ mensagem: resp });
    })
    .catch(err => {
      console.error("Erro ao cadastrar divida:", err);
      res.status(500).json({ error: 'Erro ao cadastrar dividqa' });
    });

});

app.post('/removerDivida', function (req, res) {
  const resultado = dividaController.removerDivida(req.query.id_divida);
  resultado.then(resp => { res.redirect('/listar'); });
});


//categoria do livro
app.get('/listarCategoriasDoLivro', function (req, res) {
  const resp = usuarioController.listarCategoriasDoLivro();
  res.json(resp);  // Retorna a lista de categorias em JSON
});

app.get('/cadastrarCategoriaDoLivro', function (req, res) {
  res.json({ mensagem: "Aqui deveria estar o formulário para cadastrar categoria do livro" });
});

app.post('/cadastrarCategoriaDoLivro', function (req, res) {
  const nova_categoria_do_livro = new categoria_do_livro(req.body.id_livro, req.body.id_categoria, req.body.is_ativo);

  categoria_do_livroController.criarCategoriaDoLivro(nova_categoria_do_livro)
    .then(resp => {
      res.json({ mensagem: resp });
    })
    .catch(err => {
      res.status(500).json({ error: 'Erro ao cadastrar categoria do livro', err });
    });

});

app.post('/removerCategoriaDoLivro', function (req, res) {
  const resultado = categoria_do_livro.removerCategoriaDolLivro(req.query.id_categoria);
  resultado.then(resp => { res.redirect('/listarCategoriasDoLivro'); });
});

//cursos dos usuarios

app.get('/listaCursosDosUsuarios/:id_usuario', async function (req, res) {
  const id_usuario = parseInt(req.params.id_usuario);

  try {
    const cursos = await usuarioController.listarCursoDosUsuarios(id_usuario);
    res.json(cursos);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar cursos do usuário', detalhes: err });
  }
});

app.post('/associarCursoAoUsuario', async (req, res) => {
  try {
    const { id_usuario, id_curso } = req.body;
    const erros = await cursosUsuariosController.adicionarCursoAoUsuario(id_usuario, id_curso);

    if (erros.length > 0) {
      return res.status(400).json({ erro: "Erro ao associar curso ao usuário", detalhes: erros });
    }

    res.json({ mensagem: "Curso associado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro interno no servidor", detalhes: error.message });
  }
});

app.post('/removerCursoDoUsuario', async function (req, res) {
  const { id_usuario, id_curso } = req.body;

  try {
    const resultado = await usuarioController.removerCursoDoUsuario(id_usuario, id_curso);
    res.json({ mensagem: resultado });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao remover curso do usuário', detalhes: err });
  }
});



app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}...`);
});
