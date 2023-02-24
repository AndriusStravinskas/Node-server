import { RequestHandler } from 'express';
import { ValidationError } from 'yup';
import { GamesModels, PartialGameData } from '../types';
import gamesData from '../games-data';
import PartialGameDataValidationSchema from '../validation-schema/partial-game-data-validation-schema';

export const updateGame: RequestHandler<
  { id: string | undefined }, // Parametrai
  GamesModels | ResponseError, // atsakymo tipas
  PartialGameData, // body - gaunami duomenys
  {} // QueryParams - duomenis siunčiant GET užklausas, pvz: ?min=1&max=18
> = (req, res) => {
  const { id } = req.params;

  if (id === undefined) {
    res.status(400).json({ error: 'server setup error' });
    return;
  }

  const foundGamesIndex = gamesData.findIndex((game) => game.id === id);

  if (foundGamesIndex === undefined) {
    res.status(400).json({ error: `game was not found with id: "${id}"` });
  }

  try {
    const partialGameData = PartialGameDataValidationSchema.validateSync(
      req.body,
      { abortEarly: false },
    );
    const foundGame = gamesData[foundGamesIndex];
    const updatedGame: GamesModels = {
      ...foundGame,
      ...partialGameData,
    };

    gamesData.splice(foundGamesIndex, 1, updatedGame);

    res.status(200).json(updatedGame);
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
