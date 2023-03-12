import { RequestHandler } from 'express';
import ErrorService, { ForbiddenError, ServerSetupError } from 'services/error-service';
import UserModel from 'models/user-model';
import { GameViewModels, PartialGameBody } from '../types';
import PartialGameDataValidationSchema from '../validation-schema/partial-game-data-validation-schema';
import GamesModel from '../model';

type UpdateGameHandler = RequestHandler<
{ id: string | undefined }, // Parametrai
GameViewModels | ResponseError, // atsakymo tipas
PartialGameBody, // body - gaunami duomenys
{} // QueryParams - duomenis siunčiant GET užklausas, pvz: ?min=1&max=18
>;

export const updateGame: UpdateGameHandler = async (req, res) => {
  const { id } = req.params;

  try {
    if (id === undefined) throw new ServerSetupError();
    const partialGameData = PartialGameDataValidationSchema.validateSync(
      req.body,
      { abortEarly: false },
    );
    if (req.authData === undefined) throw new ServerSetupError();
    const user = await UserModel.getUserByEmail(req.authData.email);
    const game = await GamesModel.getGame(id);

    if (user.role !== 'ADMIN' && user.id !== game.owner.id) throw new ForbiddenError();

    const updatedGame = await GamesModel.updateGame(id, partialGameData);

    res.status(200).json(updatedGame);
  } catch (error) {
    const [status, errorResponse] = ErrorService.handleError(error);
    res.status(status).json(errorResponse);
  }
};
