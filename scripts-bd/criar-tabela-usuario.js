import { sql } from "../db.js"

export async function criar() {
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS usuario (
            id_usuario SERIAL PRIMARY KEY,
            registro_academico VARCHAR(30) UNIQUE,
            nome VARCHAR(100) NOT NULL,
            data_nascimento DATE,
            email VARCHAR(255),
            telefone VARCHAR(30),
            id_tipo INTEGER REFERENCES tipo_usuario(id_tipo)
        );
        `;
        console.log("Tabela criada ou já existente");
    } catch (error) {
        console.log(error);
    }
}
