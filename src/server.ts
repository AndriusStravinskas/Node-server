import express from 'express';
import morgan from 'morgan';
import config from './config';
import gamesRouter from './routers/games-router';

const server = express();

// Middlewares
server.use(morgan('tiny'));
server.use(express.static('public'));
server.use(express.json());
server.use('/api/games', gamesRouter);

// Server init
server.listen(config.server.port, () => {
  console.log(`server is running on: http://${config.server.domain}:${config.server.port}`);
});
