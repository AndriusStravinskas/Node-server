import { RequestHandler } from 'express';
import ErrorService, { ServerSetupError } from 'services/error-service';
import UserModel from 'models/user-model';
import gameDataValidationSchema from '../validation-schema/game-data-validation-schema';
import { GameViewModels, PartialGameBody } from '../types';
import GamesModel from '../model';

export const createGame: RequestHandler<
  {},
  GameViewModels | ResponseError,
  PartialGameBody,
  {}
> = async (req, res) => {
  try {
    const gameData = gameDataValidationSchema
    .validateSync(req.body, { abortEarly: false });

    if (req.authData === undefined) throw new ServerSetupError();
    const user = await UserModel.getUserByEmail(req.authData.email);

    const createdGame = await GamesModel.createGame({ ...gameData, ownerId: user.id });

    res.status(201).json(createdGame);
  } catch (error) {
      if (error) {
        const [status, errorResponse] = ErrorService.handleError(error);
        res.status(status).json(errorResponse);
    }
  }
};
