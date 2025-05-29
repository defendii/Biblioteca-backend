import { randomUUID } from "node:crypto";
import { sql } from "./db.js";
import { criar } from './scripts-bd/criar-tabela-usuario.js';

await criar()
export class DatabasePostgres {

    async list(search) {
        let usuario;

        if (search) {
        usuario = await sql `SELECT * FROM usuario WHERE nome ILIKE ${
            "%" + search + "%"
        }`;
        } else {
        usuario = await sql `SELECT * FROM usuario`;
        }

        return usuario;
    }

    async create(usuario) {
        const { registro_academico, nome, data_nascimento, email, telefone, tipo } = usuario;

        await sql `INSERT INTO usuario (registro_academico, nome, data_nascimento, email, telefone, tipo) VALUES (${registro_academico}, ${nome}, ${data_nascimento}, ${email}, ${telefone}, ${tipo})`;
    }

    async update(id_usuario, usuario) {
        const { registro_academico, nome, data_nascimento, email, telefone, tipo } = usuario;

        await sql `UPDATE usuario SET registro_academico = ${registro_academico}, nome = ${nome}, data_nascimento = ${data_nascimento}, email = ${email}, telefone = ${telefone}, tipo = ${tipo} WHERE id_usuario = ${id_usuario}`;
    }
    }
