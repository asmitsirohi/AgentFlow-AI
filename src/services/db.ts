import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

export async function queryDatabase(query: string) {
  const result = await pool.query(query);
  return result.rows;
}
