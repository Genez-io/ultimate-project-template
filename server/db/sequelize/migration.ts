import { connectPostgres } from "./connect";

export async function initTables() {
  // This function should create the tables in the database
  // It should be called when the server starts
  // It should not drop the tables if they already exist
  // It should not throw an error if the tables already exist
  const db = connectPostgres();
  await db.sync();
}
