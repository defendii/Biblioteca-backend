const express = require('express');
const app = express();
const port = 3333;
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const cors = require('cors');

//Adicionar Bootstrap
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'))

const usuarioController = require('./controller/usuario.controller');
const usuario = require('./entidades/usuario');

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


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}...`);
});