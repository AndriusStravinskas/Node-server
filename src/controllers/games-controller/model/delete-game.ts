import mysql from 'mysql2/promise';
import config from 'config';
import { GameViewModels } from '../types';

export const deleteGame = async (id: string): Promise<void> => {
  const mySqlConnection = await mysql.createConnection(config.db);

  const preparedSql = `
  DELETE FROM images WHERE gameId = ?;
  DELETE FROM games WHERE id = ?;
  `;
  const preparedSqlData = [id, id];
  await mySqlConnection.query<GameViewModels[]>(preparedSql, preparedSqlData);

  await mySqlConnection.end();
};
