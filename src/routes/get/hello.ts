import type { FastifyRequest, FastifyReply } from "fastify";

export default {
	paths: ["/hello", "/world", "/test*"],
	handler: async (request: FastifyRequest, reply: FastifyReply) => {
		return "Hello World";
	}
}