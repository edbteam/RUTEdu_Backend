import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export default {
	paths: ["/hello", "/world", "/test*"],
	schema: {
		tags: ["get"],
		summary: "Returns a hello world message",
		description: "Simple test endpoint used to verify if backend is running.",
		querystring: z.object(
			{
			
			}
		),
		response: {
			200: z.string().describe("Hello world response")
		}
	},
	config: {
		swagger: {
			// exposeHeadRoute: true,
		}
	},
	handler: async (request: FastifyRequest, reply: FastifyReply) => {
		return "Hello World";
	}
}