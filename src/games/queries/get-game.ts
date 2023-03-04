import { RequestHandler } from 'express';
import ErrorService, { ServerSetupError } from 'services/error-service';
import { GameViewModels } from '../types';
import GameService from '../model';

export const getGame: RequestHandler<
  { id: string | undefined }, // Parametrai
  GameViewModels | ResponseError, // atsakymo tipas
  {}, // body - gaunami duomenys
  {} // QueryParams - duomenis siunčiant GET užklausas, pvz: ?min=1&max=18
> = async (req, res) => {
  const { id } = req.params;

  try {
    if (id === undefined) throw new ServerSetupError();
    const game = await GameService.getGame(id);

    res.status(200).json(game);
  } catch (error) {
    const [status, errorResponse] = ErrorService.handleError(error);
    res.status(status).json(errorResponse);
  }
};
