import { RequestHandler } from 'express';
import { ValidationError } from 'yup';
import gameDataValidationSchema from './game-data-validation-schema';
import { GamesModels, GamesData } from './game-models';
import gamesData from './games-data';

export const createGame: RequestHandler<
  {},
  GamesModels | ResponseError,
  GamesData,
  {}
> = (req, res) => {
  try {
    const gameData = gameDataValidationSchema.validateSync(req.body, { abortEarly: false });
    const newGame: GamesModels = { id: 5, ...gameData };
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
