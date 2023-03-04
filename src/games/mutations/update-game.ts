import { RequestHandler } from 'express';
import { ValidationError } from 'yup';
import { GameViewModels, PartialGameData } from '../types';
import PartialGameDataValidationSchema from '../validation-schema/partial-game-data-validation-schema';
import GameService from '../model';

export const updateGame: RequestHandler<
  { id: string | undefined }, // Parametrai
  GameViewModels | ResponseError, // atsakymo tipas
  PartialGameData, // body - gaunami duomenys
  {} // QueryParams - duomenis siunčiant GET užklausas, pvz: ?min=1&max=18
> = async (req, res) => {
  const { id } = req.params;

  if (id === undefined) {
    res.status(400).json({ error: 'server setup error' });
    return;
  }

  try {
    const partialGameData = PartialGameDataValidationSchema.validateSync(
      req.body,
      { abortEarly: false },
    );
    const updatedGame = await GameService.updateGame(id, partialGameData);

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
