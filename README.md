# 📚 Biblioteca Backend

Backend do nosso sistema de gerenciamento de biblioteca, desenvolvido em **Node.js** com **Express**.

## 🚀 Tecnologias Utilizadas

* [Express](https://expressjs.com/) – Framework de servidor HTTP.
* [Fastify](https://www.fastify.io/) – Framework web rápido e low overhead (utilizado com o plugin de CORS).
* [Cors](https://www.npmjs.com/package/cors) – Middleware para habilitar o CORS no Express.
* [Express-fileupload](https://www.npmjs.com/package/express-fileupload) – Middleware para upload de arquivos.
* [PostgreSQL (Neon)](https://console.neon.tech/)  - Banco de dados relacional utilizado de forma online
* [Nodemailer](https://nodemailer.com/about/) – Envio de emails.
* [dotenv](https://www.npmjs.com/package/dotenv) – Gerenciamento de variáveis de ambiente.

## 📁 Estrutura do Projeto

```
biblioteca-backend/
│
├── config/ 
├── controller/
├── entidades/           
├── imagens/              
├── model/
├── node_modules/              
├── .env                  
├── app.js                
├── package.json          
└── README.md             
```

## ⚙️ Instalação e Execução

1. **Clone o repositório:**

```bash
git clone https://github.com/defendii/Biblioteca-backend.git
cd Biblioteca-backend
```

2. **Instale as dependências:**

```bash
npm install
```


3. **Configure o `.env`:**

3.1 Crie um arquivo `.env` na raiz com as variáveis necessárias para conexão com o banco e envio de e-mails

3.2 Crie um banco de dados em [Neon](https://console.neon.tech/). Depois de criado, copie a URL de conexão com seu banco de dados na variável de ambiente URL. Por exemplo:

```env
PORT=3333
CONNECTION_STRING=postgresql://neondb_owner:senha@ep-withered-dew-a4hq0ydi-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require

EMAIL_ADDRESS=seuemail@gmail.com
EMAIL_PASS=suasenha-app
```

1. **Execute o servidor:**

```bash
node app.js
```


## 📬 Integrantes

* Ana Julia Defendi: [@defendii](https://github.com/defendii)
Responsável pela implementação dos CRUD
---
* Ana Julia Menegasso: [@AnaMenegeasso](https://github.com/AnaMenegasso)
Responsável pela implementação do empréstimo e da divída 
---
* Luana Rodrigues Brizola: [@luanabrizola](https://github.com/luanabrizola)
Responsável por todas as associações (editora do livro, categoria do livro, etc...)

Todas ajudaram na lógica do banco de dados.

## 📸Exemplo de uso das funcionalidades
* Cadastrar editora
![Editora](./imagemReadme/cadastrarEditora.jpeg)

* Listar categorias
![Categoria](./imagemReadme/listarCategorias.jpeg)


