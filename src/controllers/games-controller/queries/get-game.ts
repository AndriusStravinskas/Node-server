import { RequestHandler } from 'express';
import { GamesModels } from '../game-models';
import gamesData from '../games-data';

export const getGame: RequestHandler<
  { id: string | undefined }, // Parametrai
  GamesModels | ResponseError, // atsakymo tipas
  {}, // body - gaunami duomenys
  {} // QueryParams - duomenis siunčiant GET užklausas, pvz: ?min=1&max=18
> = (req, res) => {
  const { id } = req.params;

  if (id === undefined) {
    res.status(400).json({ error: 'server setup error' });
    return;
  }

  const foundGame = gamesData.find((game) => game.id === id);

  if (foundGame === undefined) {
    res.status(400).json({ error: `game was not found with id: "${id}"` });
  }
  res.status(200).json(foundGame);
};

export default getGame;
