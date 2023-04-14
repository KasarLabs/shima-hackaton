import { Pool } from 'pg';
import { testConfig } from './dbTestConfig';

const pool = process.env.NODE_ENV == 'test' ? testConfig : new Pool({
  user: 'your_database_user',
  host: 'your_database_host',
  database: 'your_database_name',
  password: 'your_database_password',
  port: 1234, // e.g., 5432
  ssl: {
    rejectUnauthorized: false,
  },
});

export const query = (text: string, params: any[], callback: (err: Error, result: any) => void) => {
  return pool.query(text, params, callback);
};