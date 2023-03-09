import { RequestHandler } from 'express';
import ErrorService from 'services/error-service';
import { GameViewModels } from '../types';
import GamesModel from '../model';

// const games: GamesModels[] = gamesData;

export const getGames: RequestHandler<
  {}, // Parametrai
  GameViewModels[] | ResponseError, // atsakymo tipas
  {}, // body - gaunami duomenys
  {} // QueryParams - duomenis siunčiant GET užklausas, pvz: ?min=1&max=18
> = async (req, res) => {
  try {
    const games = await GamesModel.getGames();
    res.status(200).json(games);
  } catch (error) {
    const [status, errorResponse] = ErrorService.handleError(error);
    res.status(status).json(errorResponse);
  }
};
