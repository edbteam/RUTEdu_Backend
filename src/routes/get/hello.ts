import type { FastifyRequest, FastifyReply } from "fastify";

export default async function hello(request: FastifyRequest, reply: FastifyReply) {
    return "Hello World!";
}
