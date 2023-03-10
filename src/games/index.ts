import express, { RequestHandler } from 'express';
import authMiddleware from 'middlewares/auth-middleware';
import { getGames } from './queries/get-games';
import { getGame } from './queries/get-game';

import { createGame } from './mutations/create-game';
import { updateGame } from './mutations/update-game';
import { deleteGame } from './mutations/delete-game';

const gamesRouter = express.Router();

gamesRouter.get('/', getGames);
gamesRouter.get('/:id', getGame);

gamesRouter.post('/', authMiddleware, createGame);
gamesRouter.delete('/:id', authMiddleware, deleteGame as RequestHandler);
gamesRouter.patch('/:id', authMiddleware, updateGame as RequestHandler);

export default gamesRouter;

/*
GET / -> Gauti visus
GET /:id -> Gauti viena
POST / -> sukurti nauja irasa
PUT /:id -> atnaujinti irasa
PATCH /:id ->
*/
