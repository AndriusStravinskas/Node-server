import { RequestHandler } from 'express';
import { ValidationError } from 'yup';
import createId from 'uniqid';
import gameDataValidationSchema from '../validation-schema/game-data-validation-schema';
import { GamesModels, GamesData } from '../types';
import gamesData from '../games-data';

export const createGame: RequestHandler<
  {},
  GamesModels | ResponseError,
  GamesData,
  {}
> = (req, res) => {
  try {
    const gameData = gameDataValidationSchema.validateSync(req.body, { abortEarly: false });
    const newGame: GamesModels = { id: createId(), ...gameData };
    gamesData.push(newGame);

    res.status(201).json(newGame);
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
