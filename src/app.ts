//! ↓ Application AntiCrash ↓
process.on('unhandledRejection', (error)=>{console.log(error)});
process.on('uncaughtException', (error)=>{console.log(error)});

//! ↓ Imports ↓
import Fastify from 'fastify';
import config from '../config.ts';
import { handler } from './handler.ts';
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

//! ↓ create a fastify instance with logger and zod type provider ↓
const fastify = Fastify(
    {
        logger: true
    }
).withTypeProvider<ZodTypeProvider>();

fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

//! ↓ Register swagger path for easy docs access ↓
await fastify.register(swagger,
	{
		openapi: {
			info: {
				title: "RUTEdu Backend API Docs",
				description: "API documentation for the RUTEdu backend",
				version: "1.0.0"
			},
			servers: [
				{
					url: `http://localhost:${config.port}`,
					description: "Local development server"
				}
			],
			tags: [
				{ name: "get", description: "Read routes" },
				{ name: "set", description: "Create routes" },
				{ name: "update", description: "Update routes" },
				{ name: "delete", description: "Delete routes" }
			]
		},
		transform: jsonSchemaTransform
	}
);

await fastify.register(swaggerUi, {
	routePrefix: "/docs"
});

//! ↓ Run handler ↓
await handler(fastify);

//! ↓ Listen for requests on a specific port ↓
fastify.listen(
    {
        port: config.port
    },
    (err, address) => {
        if (err) {
            fastify.log.error(err);
            process.exit(1);
        }
    }
);