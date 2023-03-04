import mysql from 'mysql2/promise';
import config from 'config';
import { GameData, GameViewModels } from '../types';
import SQL from './static-sql';

type CreateGameQueryResult =
[
    mysql.ResultSetHeader,
    mysql.ResultSetHeader,
    mysql.ResultSetHeader,
    mysql.ResultSetHeader,
    GameViewModels[],
];

export const createGame = async (gameData: GameData): Promise<GameViewModels> => {
  const mySqlConnection = await mysql.createConnection(config.db);
    const preparedSql = `
    INSERT INTO locations (country, city) VALUES
    (?, ?);

    INSERT INTO games (title, price, description, category, gameCondition, locationId) VALUES
    (?, ?, ?, ?, ?, last_insert_id());

    SET @gameId = last_insert_id();

    INSERT INTO images (src, gameId) VALUES
    ${gameData.images.map(() => '(?, last_insert_id())').join(',\n')};

    ${SQL.SELECT}
    WHERE g.id = @gameId
    ${SQL.GROUP}
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
  ];

    const [queryResultsArr] = await mySqlConnection.query(preparedSql, preparedSqlData);
    const [createdGame] = (queryResultsArr as CreateGameQueryResult)[4];

  await mySqlConnection.end();

  return createdGame;
};
