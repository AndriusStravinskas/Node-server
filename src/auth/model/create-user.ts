import mysql from 'mysql2/promise';
import config from 'config';
import { RegistrationData, UserEntityRow } from 'auth/type';
import bCryptService from 'services/bcrypt-service';
import SQL from './sql';

// type QueryResult = [
//   mysql.ResultSetHeader,
//   UserEntityRow[],
// ];

export const createUser = async ({
  email,
  name,
  surname,
  password,
}: RegistrationData): Promise<UserEntityRow> => {
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
