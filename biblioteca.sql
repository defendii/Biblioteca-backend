DROP TABLE IF EXISTS divida;
DROP TABLE IF EXISTS historico_emprestimo;
DROP TABLE IF EXISTS emprestimo;
DROP TABLE IF EXISTS autores_do_livro;
DROP TABLE IF EXISTS autores;
DROP TABLE IF EXISTS categoria_do_livro;
DROP TABLE IF EXISTS subcategoria;
DROP TABLE IF EXISTS categoria;
DROP TABLE IF EXISTS genero_do_livro;
DROP TABLE IF EXISTS genero;
DROP TABLE IF EXISTS livro;
DROP TABLE IF EXISTS cursos_dos_usuarios;
DROP TABLE IF EXISTS curso;
DROP TABLE IF EXISTS tipo_usuario;
DROP TABLE IF EXISTS usuario;

CREATE TABLE tipo_usuario (
	id_tipo SERIAL,
	funcao VARCHAR(50),
	PRIMARY KEY(id_tipo)
);

CREATE TABLE usuario (
	id_usuario SERIAL,
	registro_academico VARCHAR(30) UNIQUE,
	nome VARCHAR(100) NOT NULL,
	data_nascimento DATE,
	email VARCHAR(255),
	telefone VARCHAR(30),
	id_tipo INTEGER REFERENCES tipo_usuario(id_tipo),
	PRIMARY KEY(id_usuario)
);

CREATE TABLE curso (
	id_curso SERIAL,
	codigo VARCHAR(30) UNIQUE,
	nome VARCHAR(50) NOT NULL,
	PRIMARY KEY(id_curso)
);
 
CREATE TABLE cursos_dos_usuarios (
    id_usuario INTEGER REFERENCES usuario(id_usuario),
	id_curso INTEGER REFERENCES curso(id_curso),
	PRIMARY KEY (id_usuario, id_curso)
);

CREATE TABLE livro (
	id_livro SERIAL,
	titulo VARCHAR(100)     NOT NULL,
	qtde_disponivel INT,
	isbn VARCHAR(30) UNIQUE,
	edicao INT,
	editora VARCHAR(50),
	caminho_foto_capa VARCHAR(250),
	PRIMARY KEY (id_livro)
);

CREATE TABLE genero (
	id_genero SERIAL,
	nome_genero VARCHAR(50),
	PRIMARY KEY (id_genero)
);

CREATE TABLE genero_do_livro (
	id_livro INTEGER REFERENCES livro(id_livro),
	id_genero INTEGER REFERENCES genero(id_genero)
);

CREATE TABLE categoria (
	id_categoria SERIAL,
	nome_categoria VARCHAR(50),
	PRIMARY KEY (id_categoria)
);

CREATE TABLE subcategoria (
	id_subcategoria SERIAL,
	nome_subcategoria VARCHAR(50),
	id_categoria INTEGER REFERENCES categoria(id_categoria),
	PRIMARY KEY (id_subcategoria)
);

CREATE TABLE categoria_do_livro (
	id_livro INTEGER REFERENCES livro(id_livro),
	id_categoria INTEGER REFERENCES categoria(id_categoria)
);

CREATE TABLE autores (
	id_autor SERIAL,
	nome_autor VARCHAR(100),
	PRIMARY KEY (id_autor)
);

CREATE TABLE autores_do_livro (
	id_livro INTEGER REFERENCES livro(id_livro),
	id_autor INTEGER REFERENCES autores(id_autor)
);

CREATE TABLE emprestimo (
	id_emprestimo SERIAL,
    id_usuario INTEGER REFERENCES usuario(id_usuario),
    id_livro INTEGER REFERENCES livro(id_livro),
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE NOT NULL,
    PRIMARY KEY(id_emprestimo)
);

CREATE TABLE historico_emprestimo (
    id_historico SERIAL,
    id_usuario INTEGER REFERENCES usuario(id_usuario),
    id_livro INTEGER REFERENCES livro(id_livro),
    PRIMARY KEY(id_historico)
);

CREATE TABLE divida (
    id_divida SERIAL,
    id_usuario INTEGER REFERENCES usuario(id_usuario),
	id_tipo INTEGER REFERENCES tipo_usuario(id_tipo),
	id_livro INTEGER REFERENCES livro(id_livro),
    valor_multa DECIMAL(10, 2),
    dias_atraso INT NOT NULL,
    PRIMARY KEY(id_divida)
);