import { fastify } from "fastify"
import cors from "@fastify/cors"
import "dotenv/config"
import { DatabasePostgres } from "./database-postgres.js"

const server = fastify()

await server.register(cors, {
    origin: "*",
})

const database = new DatabasePostgres()

server.get("/", async (request, reply) => {
    reply.send({ message: "Bem-vindo à API da Biblioteca!" })
})

// Rota para criar usuário
server.post("/usuario", async (request, reply) => {
    const { id_usuario, registro_academico, nome, data_nascimento, email, telefone, id_tipo } = request.body

    await database.create({
        id_usuario,
        registro_academico,
        nome,
        data_nascimento,
        email,
        telefone,
        id_tipo,
    })

    return reply.status(201).send()
});

// Listar todos os usuários ou filtrar por nome
server.get("/usuarios", async (request, reply) => {
    const { nome } = request.query;
    const usuarios = await database.list(nome)

    reply.send(usuarios)
});

// Atualizar usuário
server.put("/usuarios/:id", async (request, reply) => {
    const id_usuario = request.params.id
    const { registro_academico, nome, data_nascimento, email, telefone, id_tipo } = request.body

    await database.update(id_usuario, {
        registro_academico,
        nome,
        data_nascimento,
        email,
        telefone,
        id_tipo,
    })

    return reply.status(204).send()
});

// Iniciar o servidor
server.listen(
    {
        host: "0.0.0.0",
        port: process.env.PORT ?? 3333,
    },
    function (err, address) {
        if (err) {
            server.log.error(err)
            process.exit(1)
        }

        console.log(`Servidor rodando no endereço ${address}`)
    }
);
