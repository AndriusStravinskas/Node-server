import { RequestHandler } from 'express';
import { ValidationError } from 'yup';
import createId from 'uniqid';
import gameDataValidationSchema from '../validation-schema/game-data-validation-schema';
import { GamesModels, GamesData } from '../types';
import gamesData from '../games-data';
import mysql from 'mysql2/promise';
import config from '../../../config';

type CreateGameQueryResult = 
[
    mysql.ResultSetHeader,
    mysql.ResultSetHeader,
    mysql.ResultSetHeader,
    mysql.ResultSetHeader,
    GamesModels[],
];

export const createGame: RequestHandler<
  {},
  GamesModels | ResponseError,
  GamesData,
  {}
> = async (req, res) => {
  try {
    const gameData = gameDataValidationSchema.validateSync(req.body, { abortEarly: false });
    
    const mySqlConnection = await mysql.createConnection(config.db)
    const preparedSql = `
    INSERT INTO locations (country, city) VALUES
    (?, ?);

    INSERT INTO games (title, price, description, category, gameCondition, locationId) VALUES
    (?, ?, ?, ?, ?, last_insert_id());

    SET @gameId = last_insert_id();

    INSERT INTO images (src, gameId) VALUES
    ${gameData.images.map(() => `(?, last_insert_id())`).join(',\n')};

    SELECT 
	  g.id,
    g.title,
    json_objectagg(
    l.country,
    l.city)
    as location,
    g.price,
    g.gameCondition,
    g.description,
    json_arrayagg(i.src) as images
FROM images i
LEFT JOIN games g
	ON i.gameId = g.id
LEFT JOIN locations l
	ON g.locationId = l.id
  WHERE g.id = @gameId
group by g.id;
  `;

  const preparedSqlData = [
    gameData.location.country,
    gameData.location.city,
    gameData.title,
    gameData.price,
    gameData.description,
    gameData.category,
    gameData.gameCondition,
    ...gameData.images,
  ]

  console.log(preparedSql);
  
    const [
      queryResultsArr,
      test
    ] = await mySqlConnection.query(preparedSql, preparedSqlData);
    const [ createdGame ] = (queryResultsArr as CreateGameQueryResult)[4];

  console.log({
      createdGame
  });
  

  await mySqlConnection.end()

    res.status(201).json(createdGame);
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
