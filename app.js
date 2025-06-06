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
const usuario = require('./entidades/usuario');
const autores = require('./entidades/autores');
const editora = require('./entidades/editora');
const curso = require('./entidades/curso');

//Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

//Configuração express-fileupload
app.use(fileupload());

//Necessário apenas quando for listas
app.use('/imagens', express.static('./imagens'));

app.get('/', function (req, res) {

});

// usuario

app.get('/listarUsuarios', function (req, res) {
    const resp = usuarioController.listarUsuarios();
    res.json(resp);  // Retorna a lista de usuários em JSON
});

app.get('/cadastrarUsuario', function (req, res) {
  res.json({ mensagem: "Aqui deveria estar o formulário para cadastrar usuário" });
});

app.post('/cadastrarUsuario', function (req, res) {
  const novo_usuario = new usuario(null, req.body.nome, req.body.registro_academico, req.body.data_nascimento, req.body.email, req.body.telefone, req.body.tipo, req.body.is_ativo);

  usuarioController.criarUsuario(novo_usuario)
    .then(resp => {
      res.json({ mensagem: resp });
    })
    .catch(err => {
      res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    });

});

app.post('/removerUsuario', function (req, res) {
  const resultado = usuarioController.removerUsuario(req.query.username);
  resultado.then(resp => { res.redirect('/listarUsuarios'); });
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

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}...`);
});