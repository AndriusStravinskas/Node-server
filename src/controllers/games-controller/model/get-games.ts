import mysql from 'mysql2/promise';
import config from 'config';
import { GameViewModels } from '../types';
import SQL from './static-sql';

export const getGames = async (): Promise<GameViewModels[]> => {
  const mySqlConnection = await mysql.createConnection(config.db);
  const sql = [SQL.SELECT, SQL.GROUP].join('\n');
  const [games] = await mySqlConnection.query<GameViewModels[]>(sql);
  await mySqlConnection.end();

  return games;
};
