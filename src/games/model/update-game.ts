import mysql from 'mysql2/promise';
import config from 'config';
import { colonObjectQueryFormat } from 'services/my-sql';
import { GameViewModels, PartialGameBody } from '../types';
import SQL from './static-sql';

type PrepareSqlResult = [string, Record<string, string>];

type PrepareSql = (gameData: PartialGameBody) => PrepareSqlResult;

const prepareImagesSql: PrepareSql = (gameData) => {
  const bindingsOrNull = gameData.images?.reduce((prevBinding, img, i) => ({
    ...prevBinding,
    [`img${i + 1}`]: img,
  }), {} as Record<string, string>) ?? null;
  const shouldInsert = bindingsOrNull !== null;
  const shouldInsertImages = gameData.images !== undefined && gameData.images?.length > 0;

  const sql = shouldInsert
    ? `
      DELETE FROM images
      WHERE images.gameId = :id;
      ${shouldInsertImages ? `INSERT INTO images (src, gameId) VALUES
          ${Object.keys(bindingsOrNull).map((imgBinding) => `(:${imgBinding}, :id)`).join(',\n')};`
        : ''
      }
    ` : '';

    const bindings = bindingsOrNull ?? {};

    return [sql, bindings];
};

const prepareLocationSql: PrepareSql = (gameData) => {
  const sql = gameData.location !== undefined ? `
  INSERT INTO locations (country, city) VALUES
    (:country, :city);` : '';
  const bindings = gameData.location ?? {};

  return [sql, bindings];
};

const prepareGameSql: PrepareSql = (gameData) => {
  const propsSql = [
    gameData.title !== undefined ? 'title = :title' : null,
    gameData.price !== undefined ? 'price = :price' : null,
    gameData.description !== undefined ? 'description = :description' : null,
    gameData.gameCondition !== undefined ? 'gameCondition = :gameCondition' : null,
    gameData.category !== undefined ? 'category = :category' : null,
    gameData.location !== undefined ? 'locationId = LAST_INSERT_ID()' : null,
  ].filter((setPropSql) => setPropSql !== null).join(',\n');

  const sql = propsSql.length > 0 ? `
  UPDATE games SET
  ${propsSql} 
  WHERE games.id = :id;
  ` : '';

  const bindings: Record<string, string> = {};
  if (gameData.title !== undefined) bindings.title = gameData.title;
  if (gameData.price !== undefined) bindings.price = String(gameData.price);
  if (gameData.description !== undefined) bindings.description = gameData.description;
  if (gameData.gameCondition !== undefined) bindings.gameCondition = gameData.gameCondition;
  if (gameData.category !== undefined) bindings.category = gameData.category;

  return [sql, bindings];
};

export const updateGame = async (id:string, gameData: PartialGameBody): Promise<GameViewModels> => {
  const mySqlConnection = await mysql.createConnection(config.db);
  mySqlConnection.config.queryFormat = colonObjectQueryFormat;

  const [imagesSql, imagesBindings] = prepareImagesSql(gameData);
  const [locationSql, locationBindings] = prepareLocationSql(gameData);
  const [gameSql, gameBindings] = prepareGameSql(gameData);

  const preparedSql = `
    ${imagesSql}
    ${locationSql}
    ${gameSql}
    ${SQL.SELECT}
    WHERE g.id = :id
    ${SQL.GROUP}
  `.trim();

  const bindings = {
    id,
    ...imagesBindings,
    ...locationBindings,
    ...gameBindings,
  };

  const [queryResultsArr] = await mySqlConnection.query<GameViewModels[]>(preparedSql, bindings);
  const updatedGame = queryResultsArr.at(-1) as GameViewModels;

  console.log(queryResultsArr);
  console.log(bindings);
  await mySqlConnection.end();

  return updatedGame;
};
