import mysql from 'mysql2/promise';
import config from 'config';
import { NotFoundError } from 'services/error-service';
import { GameViewModels } from '../types';
import SQL from './static-sql';

export const getGame = async (id: string): Promise<GameViewModels> => {
  const mySqlConnection = await mysql.createConnection(config.db);
  const preparedSql = [
    SQL.SELECT,
    'WHERE g.id = ?',
    SQL.GROUP,
  ].join('\n');
  const preparedSqlData = [id];
  const [games] = await mySqlConnection.query<GameViewModels[]>(preparedSql, preparedSqlData);

  await mySqlConnection.end();

  if (games.length === 0) throw new NotFoundError(`game with id: ${id} was not found`);

  return games[0];
};
