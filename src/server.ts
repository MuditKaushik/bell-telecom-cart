import express, { json, urlencoded } from 'express';
import compression from 'compression';
import cspHelmet from 'helmet';
import { env } from 'node:process';
import { handlerRoutes } from './handlers/routes.js';

const PORT = env['PORT'] || '8080';

const server = express();
server.use(json());
server.use(urlencoded({ extended: true }));
server.use(compression());
server.use(cspHelmet());

server.use('/api', handlerRoutes);

server.listen(PORT, (error) => {
  if (!error) {
    console.log(`server listening at ${PORT}`);
  }
});

export { server };