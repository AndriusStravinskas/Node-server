import { RequestHandler } from 'express';
import { GamesModels } from '../types';
import gamesData from '../games-data';
import mysql from 'mysql2/promise';
import config from '../../../config';

export const getGame: RequestHandler<
  { id: string | undefined }, // Parametrai
  GamesModels | ResponseError, // atsakymo tipas
  {}, // body - gaunami duomenys
  {} // QueryParams - duomenis siunčiant GET užklausas, pvz: ?min=1&max=18
> = async (req, res) => {
  const { id } = req.params;

  if (id === undefined) {
    res.status(400).json({ error: 'server setup error' });
    return;
  }

  const mySqlConnection = await mysql.createConnection(config.db)
  const [games] = await mySqlConnection.query<GamesModels[]>(`
  SELECT 
	  g.id,
    g.title,
    json_objectagg(
    l.country,
    l.city)
    as location,
    g.price,
    g.gameCondition,
    json_arrayagg(i.src) as imagesimgCount
FROM images i
LEFT JOIN games g
	ON i.gameId = g.id
LEFT JOIN locations l
	ON g.locationId = l.id
WHERE g.id = ${id}
group by g.id;`);
await mySqlConnection.end()

if (games.length === 0) {
  res.status(404).json({ error: `game with id: ${id} was not found  `});
  return;
}

  res.status(200).json(games[0]);
};
