//! ↓ Application AntiCrash ↓
process.on('unhandledRejection', (error)=>{console.log(error)});
process.on('uncaughtException', (error)=>{console.log(error)});

import fs from 'node:fs/promises';
import path from 'path';
import Fastify, { type FastifyInstance } from "fastify";
import Bun from 'bun';

type t_Request_Type = 'get' | 'set' | 'update' | 'delete';
const l_Request_Types: string[] = ['get', 'set', 'update', 'delete'];

async function fetchFolder(requestType: t_Request_Type) {
	try {
		const files: string[] | null = await fs.readdir( path.join( import.meta.dirname, 'routes', requestType ) );
		if (files == null) return [];
		return files;
	} catch (error) {
		if (typeof error === 'object' && error !== null && 'code' in error && (error as { code?: string }).code === 'ENOENT') return [];
		throw error;
	}
}

async function handler(fastify: FastifyInstance) {

	for ( const rq_type of l_Request_Types ) {
		
		const commands = await fetchFolder(rq_type);
		
	}
	
}

export { handler };