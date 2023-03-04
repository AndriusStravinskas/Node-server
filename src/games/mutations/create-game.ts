import { RequestHandler } from 'express';
import ErrorService from 'services/error-service';
import gameDataValidationSchema from '../validation-schema/game-data-validation-schema';
import { GameViewModels, GameData } from '../types';
import GameService from '../model';

export const createGame: RequestHandler<
  {},
  GameViewModels | ResponseError,
  GameData,
  {}
> = async (req, res) => {
  try {
    const gameData: GameData = gameDataValidationSchema
    .validateSync(req.body, { abortEarly: false });

    const createdGame = await GameService.createGame(gameData);

    res.status(201).json(createdGame);
  } catch (error) {
      if (error) {
        const [status, errorResponse] = ErrorService.handleError(error);
        res.status(status).json(errorResponse);
    }
  }
};
