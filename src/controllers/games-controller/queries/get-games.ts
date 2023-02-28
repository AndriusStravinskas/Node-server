import { RequestHandler } from 'express';
import { GamesModels } from '../types';
import mysql from 'mysql2/promise';
import config from '../../../config';

type Game = {
  id: string,
  title: string,
};

// const games: GamesModels[] = gamesData;

export const getGames: RequestHandler<
  {}, // Parametrai
  Game[], // atsakymo tipas
  {}, // body - gaunami duomenys
  {} // QueryParams - duomenis siunčiant GET užklausas, pvz: ?min=1&max=18
> = async (req, res) => {
  const mySqlConnection = await mysql.createConnection(config.db)
  const [rows] = await mySqlConnection.query<GamesModels[]>(`
  SELECT 
	i.id as imgId,
	i.src as imgSrc,
    g.title as gameTitle,
    g.gameCondition,
    count(g.id) as imgCount
FROM images i
JOIN games g
	ON i.gameId = g.id
group by g.id;`)
  console.log(rows)
  await mySqlConnection.end()


  // res.status(200).json(gamesData);
};
