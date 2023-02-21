import express from 'express';
import { getGames, createGame } from '../controllers/games-controller';

const gamesRouter = express.Router();

gamesRouter.get('/', getGames);
gamesRouter.post('/', createGame);

export default gamesRouter;
