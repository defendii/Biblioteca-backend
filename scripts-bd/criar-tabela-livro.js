import { sql } from "../db.js"

export async function criarAluno(){
    try {
        await sql`
        CREATE TABLE livro (
            id_livro SERIAL,
            titulo VARCHAR(100) NOT NULL,
            qtde_disponivel INT,
            isbn VARCHAR(30) UNIQUE,
            edicao INT,
            editora VARCHAR(50),
            caminho_foto_capa VARCHAR(250),
            PRIMARY KEY (id_livro)
        );
        `
        console.log("Tabela criada")
    } catch (error) {
        console.log(error)
    }
}
