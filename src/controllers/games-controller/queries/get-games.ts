import { RequestHandler } from 'express';
import { GamesModels } from '../types';
import gamesData from '../games-data';

type Game = {
  id: string,
  title: string,
};

const games: GamesModels[] = gamesData;

export const getGames: RequestHandler<
  {}, // Parametrai
  Game[], // atsakymo tipas
  {}, // body - gaunami duomenys
  {} // QueryParams - duomenis siunčiant GET užklausas, pvz: ?min=1&max=18
> = (req, res) => {
  res.status(200).json(games);
};
