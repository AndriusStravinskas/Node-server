import mysql from 'mysql2/promise';
import config from 'config';
import { UserEntityRow } from 'auth/type';
import SQL from './sql';

type UserData = {
  email: string,
  password: string,
  name: string,
  surname: string,
};

// type QueryResult = [
//   mysql.ResultSetHeader,
//   UserEntityRow[],
// ];

export const createUser = async ({
  email,
  name,
  surname,
  password,
}: UserData): Promise<UserEntityRow> => {
  const mySqlConnection = await mysql.createConnection(config.db);
    const preparedSql = `
      INSERT INTO users (email, password, name, surname) VALUES
      (?, ?, ?, ?);

      ${SQL.SELECT}
      WHERE id = last_insert_id()
    `;

  const preparedSqlData = [
    email,
    password,
    name,
    surname,
  ];

    const [queryResultsArr] = await mySqlConnection.query(preparedSql, preparedSqlData);
    const [createrUser] = (queryResultsArr as UserEntityRow[][])[1];

  await mySqlConnection.end();

  return createrUser;
};
