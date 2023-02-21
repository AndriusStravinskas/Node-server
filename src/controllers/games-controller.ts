import { RequestHandler } from 'express';

type Game = {
  id: number,
  title: string,
};

const games = [
  { id: 1, title: 'game 1' },
  { id: 2, title: 'game 2' },
  { id: 3, title: 'game 3' },
  { id: 4, title: 'game 4' },
];

export const getGames: RequestHandler<
  {}, // Parametrai
  Game[], // atsakymo tipas
  {}, // body - gaunami duomenys
  {} // QueryParams - duomenis siunčiant GET užklausas, pvz: ?min=1&max=18
> = (req, res) => {
  res.status(200).json(games);
};

export const createGame: RequestHandler<
{},
Game | ResponseError,
{ title: string | undefined },
{}
> = (req, res) => {
  const title = req.body?.title;
  if (title === undefined) {
    res.status(400).json({ error: 'title is required in request body' });
    return;
  }

  const newGame = { id: 5, title };
  games.push(newGame);
  res.status(201).json(newGame);
};
