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
        const { registro_academico, nome, data_nascimento, email, telefone, tipo } = request.body
       server.post("/usuario", async (request, reply) => {
    console.log("🔍 Body recebido no POST /usuario:");
    console.log(request.body);

    const { registro_academico, nome, data_nascimento, email, telefone, tipo } = request.body;

    console.log("🧪 Verificando campos recebidos:");
    console.log("registro_academico:", registro_academico);
    console.log("nome:", nome);
    console.log("data_nascimento:", data_nascimento);
    console.log("email:", email);
    console.log("telefone:", telefone);
    console.log("tipo:", tipo);

    if (
        !registro_academico ||
        !nome ||
        !data_nascimento ||
        !email ||
        !telefone ||
        !tipo
    ) {
        return reply.status(400).send({
            error: "Todos os campos são obrigatórios e não podem ser undefined.",
        });
    }

    await database.create({
        registro_academico,
        nome,
        data_nascimento,
        email,
        telefone,
        tipo,
    });

    return reply.status(201).send();
});

        return reply.status(201).send()
    });

    server.get("/usuario", async (request, reply) => {
        const { nome } = request.query
        const usuario = await database.list(nome)
        reply.send(usuario)
    });

    server.put("/usuario/:id", async (request, reply) => {
        const id_usuario = request.params.id
        const { registro_academico, nome, data_nascimento, email, telefone, tipo } = request.body

        await database.update(id_usuario, {
            registro_academico,
            nome,
            data_nascimento,
            email,
            telefone,
            tipo,
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
