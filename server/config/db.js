import { createPool } from 'mysql2';
import {config as enableDotEnv} from 'dotenv'
if (process.env.NODE_ENV !== 'production') enableDotEnv()

const pool = createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: (process.env.NODE_ENV !== 'production') ? process.env.DB_NAME_DEV : process.env.DB_NAME_PROD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export {
    pool as DB
}