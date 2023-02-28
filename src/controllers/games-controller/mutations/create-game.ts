import { RequestHandler } from 'express';
import { ValidationError } from 'yup';
import createId from 'uniqid';
import gameDataValidationSchema from '../validation-schema/game-data-validation-schema';
import { GamesModels, GamesData } from '../types';
import gamesData from '../games-data';
import mysql from 'mysql2/promise';
import config from '../../../config';

export const createGame: RequestHandler<
  {},
  GamesModels | ResponseError,
  GamesData,
  {}
> = async (req, res) => {
  try {
    const gameData = gameDataValidationSchema.validateSync(req.body, { abortEarly: false });
    
    const mySqlConnection = await mysql.createConnection(config.db)
    const sql = `
    INSERT INTO locations (country, city) VALUES
    ('${gameData.location.country}', '${gameData.location.city}');

    INSERT INTO games (title, price, description, category, gameCondition, locationId) VALUES
    ('${gameData.title}', '${gameData.price}', '${gameData.description}', '${gameData.category}', '${gameData.gameCondition}', last_insert_id());

    INSERT INTO images (src, gameId) VALUES
    ${gameData.images.map(img => `('${img}', last_insert_id())`).join(', ')}
  `;

  console.log(sql);
  
    const queryResponse = await mySqlConnection.query<mysql.ResultSetHeader>(sql);

  console.log(queryResponse);
  

  await mySqlConnection.end()

    res.status(201).json({} as GamesModels);
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
