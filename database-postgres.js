import { randomUUID } from "node:crypto";
import { sql } from "./db.js";
import { criar } from './scripts-bd/criar-tabela-usuario.js';

await criar()
export class DatabasePostgres {

    async list(search) {
        let usuario;

        if (search) {
        usuario = await sql`select * from usuario where nome ilike ${
            "%" + search + "%"
        }`;
        } else {
        usuario = await sql`select * from usuario`;
        }

        return usuario;
    }

    async create(usuario) {
        const id_usuario = randomUUID();
        const { registro_academico, nome, data_nascimento, email, telefone, id_tipo } = usuario;

        await sql`insert into usuarios (id, registro_academico, nome, data_nascimento, email, telefone, id_tipo) VALUES (${id_usuario}, ${registro_academico}, ${nome}, ${data_nascimento}, ${email}, ${telefone}, ${id_tipo})`;
    }

    async update(id, usuario) {
        const { registro_academico, nome, data_nascimento, email, telefone, id_tipo } = usuario;

        await sql`update usuarios set registro_academico = ${registro_academico}, nome = ${nome}, data_nascimento = ${data_nascimento}, email = ${email}, telefone = ${telefone}, tipo_id= ${id_tipo} WHERE id = ${id}`;
    }
    }
