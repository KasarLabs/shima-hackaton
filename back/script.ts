const { Pool } = require("pg");

const pool = new Pool({
  user: "Antoine",
  host: "localhost",
  database: "shima",
  password: "Shima75",
  port: 5432,
});

pool.query("SELECT * FROM schema_owner.users", (err: any, res: any) => {
  if (err) {
    console.log("Error:", err);
  } else {
    console.log("Connected to PostgreSQL database:", res.rows);
  }
  pool.end();
});
