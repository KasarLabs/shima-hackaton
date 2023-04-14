import { Pool } from 'pg';

export const testConfig = new Pool({
  user: 'bora',
  host: 'localhost',
  database: 'test_shima',
  password: 'qlfsat',
  port: 5432, // e.g., 5432
  ssl: {
    rejectUnauthorized: false,
  },
});