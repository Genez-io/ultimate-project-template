import { Sequelize } from "sequelize";
import { postgresURL } from "../../config/envHandler";
import pg from "pg";

export function connectPostgres() {
  const db = new Sequelize(postgresURL, {
    dialect: "postgres",
    dialectModule: pg,
    define: {
      timestamps: false,
    },
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
  });

  return db;
}
