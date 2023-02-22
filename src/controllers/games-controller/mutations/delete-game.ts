import { RequestHandler } from 'express';
import { GamesModels } from '../game-models';
import gamesData from '../games-data';

export const deleteGame: RequestHandler<
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

  const foundGameIndex = gamesData.findIndex((game) => game.id === id);

  if (foundGameIndex === -1) {
    res.status(400).json({ error: `Game was not found with id: "${id}"` });
  }

  const [deletedGame] = gamesData.splice(foundGameIndex, 1);

  res.status(200).json(deletedGame);
};

export default deleteGame;
