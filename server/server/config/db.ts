import * as dotenv from 'dotenv';
import * as mysql from 'mysql2/promise';

dotenv.config({ path: '../.env' });

function createPool() {
  console.log(process.env.DB_USER, process.env.DB_PASSWORD);
  return mysql.createPool({
    host: 'ecommerce_db',
    user: 'root',
    password: 'password',
    database: 'ecommerce_db',
  });
}
const pool = createPool();

export default pool;
