import express from 'express';
import { getGames } from './queries/get-games';
import { getGame } from './queries/get-game';

import { createGame } from './mutations/create-game';
import { updateGame } from './mutations/update-game';
import { deleteGame } from './mutations/delete-game';

const gamesRouter = express.Router();

gamesRouter.get('/', getGames);
gamesRouter.get('/:id', getGame);

gamesRouter.post('/', createGame);
gamesRouter.patch('/:id', updateGame);
gamesRouter.delete('/:id', deleteGame);

export default gamesRouter;
