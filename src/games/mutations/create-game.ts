import { RequestHandler } from 'express';
import { ValidationError } from 'yup';
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
    const gameData = gameDataValidationSchema.validateSync(req.body, { abortEarly: false });

    const createdGame = await GameService.createGame(gameData);

    res.status(201).json(createdGame);
  } catch (error) {
    if (error instanceof ValidationError) {
      const manyErrors = error.errors.length > 1;
        res.status(400).json({
          error: manyErrors ? 'validation error' : error.errors[0],
          errors: manyErrors ? error.errors : undefined,
        });
      } else if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'Invalid data' });
      }
  }
};
