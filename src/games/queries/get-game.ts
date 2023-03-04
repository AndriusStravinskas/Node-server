import { RequestHandler } from 'express';
import { GameViewModels } from '../types';
import GameService from '../model';

export const getGame: RequestHandler<
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
    res.status(200).json(game);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'request error';
    res.status(404).json({ error: message });
  }
};
