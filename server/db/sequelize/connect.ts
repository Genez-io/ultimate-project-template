import { DataTypes, Sequelize } from "sequelize";
import { TaskModel } from "./task";
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
  TaskModel.init(
    {
      taskId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      title: DataTypes.STRING(512),
      ownerId: DataTypes.STRING(512),
      solved: DataTypes.BOOLEAN,
      date: DataTypes.DATE,
    },
    {
      sequelize: db,
      modelName: "TaskModel",
      tableName: "tasks",
    }
  );
  TaskModel.sync();
}
