import express from 'express';
import {
  getGames,
  getGame,
  createGame,
  deleteGame,
  updateGame,
   } from '../controllers/games-controller';

const gamesRouter = express.Router();

gamesRouter.get('/', getGames);
gamesRouter.get('/:id', getGame);

gamesRouter.post('/', createGame);
gamesRouter.patch('/:id', updateGame);
gamesRouter.delete('/:id', deleteGame);

export default gamesRouter;
