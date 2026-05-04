import fs from 'node:fs/promises';
import path from 'path';
import { type FastifyInstance } from "fastify";

type t_Request_Type = 'get' | 'set' | 'update' | 'delete';
const l_Request_Types: t_Request_Type[] = ['get', 'set', 'update', 'delete'];

const methodMap: Record<t_Request_Type, 'get' | 'post' | 'put' | 'delete'> = {
    get: 'get',
    set: 'post',
    update: 'put',
    delete: 'delete'
};

async function fetchFolder(requestType: t_Request_Type) {
	try {
		const folderPath = path.join(import.meta.dirname, 'routes', requestType);
		return await fs.readdir(folderPath);
	} catch (error) {
		if (typeof error === 'object' && error !== null && 'code' in error && (error as { code?: string }).code === 'ENOENT') return [];
		throw error;
	}
}

async function handler(fastify: FastifyInstance) {
	for (const rq_type of l_Request_Types) {
		const files = await fetchFolder(rq_type);
		
		for (const file of files) {
			if (!file.endsWith('.ts') && !file.endsWith('.js')) continue;

			const filePath = path.join(import.meta.dirname, 'routes', rq_type, file);

			try {
				const route = await import(filePath);
				const schema = route.default.schema || route.schema;
				const config = route.default.config || route.config;
				const handlerFn = route.default.handler || route.handler;
				const routePaths = route.default.paths || route.paths;

				if (typeof handlerFn === 'function') {
					const method = methodMap[rq_type];
					for (const route of routePaths) {
						fastify[method](route, { schema, config }, handlerFn);
						console.log(`[Route Loader] Registered ${rq_type.toUpperCase()} ${route} (via ${method.toUpperCase()})`);
					}
				} else {
					console.warn(`[Route Loader] Skipping ${filePath}: No default export or 'handler' function found.`);
				}
			} catch (err) {
				console.error(`[Route Loader] Error loading route ${filePath}:`, err);
			}
		}
	}
}

export { handler };
