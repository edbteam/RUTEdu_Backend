//! ↓ Application AntiCrash ↓
process.on('unhandledRejection', (error)=>{console.log(error)});
process.on('uncaughtException', (error)=>{console.log(error)});

import fs from 'node:fs/promises';
import path from 'path';
import Fastify, { type FastifyInstance } from "fastify";
import Bun from 'bun';

type t_Request_Type = 'get' | 'set' | 'update' | 'delete';

async function fetchFolder(requestType: t_Request_Type) {
    const files: string[] | null = await fs.readdir(path.join(import.meta.dirname, 'routes', requestType));
	if (files == null) return [];
	return files;
}

async function handler(fastify: FastifyInstance) {

	fastify.log.info(await fetchFolder("get"));

}

export { handler };