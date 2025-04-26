import * as dotenv from 'dotenv';
import { readFile } from 'fs/promises';
import * as mysql from 'mysql2/promise';
import * as path from 'path';

dotenv.config({ path: '../.env' });

async function createConnection() {
  console.log(process.env.Db_HOST);
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true,
  });
}

async function runSqlFile() {
  const filePath = path.join(__dirname, 'init.sql');
  const sql = await readFile(filePath, 'utf-8');
  const connection = await createConnection();

  try {
    await connection.query(sql);
    console.log('Database initialized successfully');
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
}

(async () => await runSqlFile())();
