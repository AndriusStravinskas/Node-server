import { RequestHandler } from 'express';
import ErrorService, { ServerSetupError } from 'services/error-service';
import GameService from '../model';
import { GameViewModels } from '../types';

export const deleteGame: RequestHandler<
  { id: string | undefined }, // Parametrai
  GameViewModels | ResponseError, // atsakymo tipas
  {}, // body - gaunami duomenys
  {} // QueryParams - duomenis siunčiant GET užklausas, pvz: ?min=1&max=18
> = async (req, res) => {
  const { id } = req.params;

  try {
    if (id === undefined) throw new ServerSetupError();
    const game = await GameService.getGame(id);
    await GameService.deleteGame(id);

    res.status(200).json(game);
  } catch (error) {
    const [status, errorResponse] = ErrorService.handleError(error);
    res.status(status).json(errorResponse);
  }
};
