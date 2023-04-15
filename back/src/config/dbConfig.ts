import { Pool } from "pg";
import { testConfig } from "./dbTestConfig";

const pool =
  process.env.NODE_ENV == "test"
    ? testConfig
    : new Pool({
        user: "Antoine",
        host: "localhost",
        database: "shima",
        password: "Shima75",
        port: 5432, // e.g., 5432
        ssl: false,
      });

export const query = (
  text: string,
  params: any[],
  callback: (err: Error, result: any) => void
) => {
  return pool.query(text, params, callback);
};
