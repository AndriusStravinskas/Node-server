import express from 'express';
import { getGames } from './queries/get-games';
import { getGame } from './queries/get-game';

import { createGame } from './mutations/create-game';
import { updateGame } from './mutations/update-game';
import { deleteGame } from '../../services/delete-game';

const gamesRouter = express.Router();

gamesRouter.get('/', getGames);
gamesRouter.get('/:id', getGame);

gamesRouter.post('/', createGame);
gamesRouter.delete('/:id', deleteGame);
gamesRouter.patch('/:id', updateGame);

export default gamesRouter;

/*
GET / -> Gauti visus
GET /:id -> Gauti viena
POST / -> sukurti nauja irasa
PUT /:id -> atnaujinti irasa
PATCH /:id ->
*/
