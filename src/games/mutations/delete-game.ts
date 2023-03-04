import { RequestHandler } from 'express';
import GameService from '../model';
import { GameViewModels } from '../types';

export const deleteGame: RequestHandler<
  { id: string | undefined }, // Parametrai
  GameViewModels | ResponseError, // atsakymo tipas
  {}, // body - gaunami duomenys
  {} // QueryParams - duomenis siunčiant GET užklausas, pvz: ?min=1&max=18
> = async (req, res) => {
  const { id } = req.params;

  if (id === undefined) {
    res.status(400).json({ error: 'server setup error' });
    return;
  }

  try {
    const game = await GameService.getGame(id);
    await GameService.deleteGame(id);

    res.status(200).json(game);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Request error' });
    }
  }
};
