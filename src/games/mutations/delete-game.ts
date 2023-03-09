import { RequestHandler } from 'express';
import UserModel from 'models/user-model';
import ErrorService, { ForbiddenError, ServerSetupError } from 'services/error-service';
import GamesModel from '../model';
import { GameViewModels } from '../types';

type DeleteGameHandler = RequestHandler<
  { id: string | undefined }, // Parametrai
  GameViewModels | ResponseError, // atsakymo tipas
  {}, // body - gaunami duomenys
  {} // QueryParams - duomenis siunčiant GET užklausas, pvz: ?min=1&max=18
>;

export const deleteGame: DeleteGameHandler = async (req, res) => {
  const { id } = req.params;

  try {
    if (id === undefined) throw new ServerSetupError();
    if (req.authData === undefined) throw new ServerSetupError();
    const user = await UserModel.getUserByEmail(req.authData.email);
    const game = await GamesModel.getGame(id);

    if (user.role !== 'ADMIN' && user.id !== game.owner.id) throw new ForbiddenError();

    await GamesModel.deleteGame(id);

    res.status(200).json(game);
  } catch (error) {
    const [status, errorResponse] = ErrorService.handleError(error);
    res.status(status).json(errorResponse);
  }
};
