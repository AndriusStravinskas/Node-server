import mysql from 'mysql2/promise';
import config from 'config';
import { UserEntityRow } from 'auth/type';
import bCryptService from 'services/bcrypt-service';
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

    const hashedPassword = bCryptService.hash(password);

  const preparedSqlData = [
    email,
    hashedPassword,
    name,
    surname,
  ];

    const [queryResultsArr] = await mySqlConnection.query(preparedSql, preparedSqlData);
    const [createrUser] = (queryResultsArr as UserEntityRow[][])[1];

  await mySqlConnection.end();

  return createrUser;
};
