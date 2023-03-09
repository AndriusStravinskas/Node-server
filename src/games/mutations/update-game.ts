import { RequestHandler } from 'express';
import ErrorService, { ServerSetupError } from 'services/error-service';
import { GameViewModels, PartialGameData } from '../types';
import PartialGameDataValidationSchema from '../validation-schema/partial-game-data-validation-schema';
import GameService from '../model';

type UpdateGameHandler = RequestHandler<
{ id: string | undefined }, // Parametrai
GameViewModels | ResponseError, // atsakymo tipas
PartialGameData, // body - gaunami duomenys
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
    const updatedGame = await GameService.updateGame(id, partialGameData);

    res.status(200).json(updatedGame);
  } catch (error) {
    const [status, errorResponse] = ErrorService.handleError(error);
    res.status(status).json(errorResponse);
  }
};
