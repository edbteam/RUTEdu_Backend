import Fastify from 'fastify';
import config from '../config';
import { handler } from './handler.ts';

const fastify = Fastify(
    {
        logger: true
    }
);

await handler(fastify);

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