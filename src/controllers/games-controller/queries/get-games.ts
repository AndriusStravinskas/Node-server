import { RequestHandler } from 'express';
import { GameViewModels } from '../types';
import GameService from '../model';

// const games: GamesModels[] = gamesData;

export const getGames: RequestHandler<
  {}, // Parametrai
  GameViewModels[], // atsakymo tipas
  {}, // body - gaunami duomenys
  {} // QueryParams - duomenis siunčiant GET užklausas, pvz: ?min=1&max=18
> = async (req, res) => {
  const games = await GameService.getGames();

  res.status(200).json(games);
};
