import { fastify } from "fastify"
import cors from "@fastify/cors"
import "dotenv/config"
import { DatabasePostgres } from "./database-postgres.js"

async function main() {
    const server = fastify()

    await server.register(cors, {
        origin: "*",
    })

    const database = new DatabasePostgres()

    server.get("/", async (request, reply) => {
        reply.send({ message: "Bem-vindo à API da Biblioteca!" })
    })

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

    server.get("/usuarios", async (request, reply) => {
        const { nome } = request.query
        const usuarios = await database.list(nome)
        reply.send(usuarios)
    });

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

    // Iniciar servidor
    try {
        await server.listen({
            host: "0.0.0.0",
            port: process.env.PORT ?? 3333,
        })
        console.log("Servidor rodando 🚀")
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

main()
