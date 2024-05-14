import { DataTypes, Sequelize } from "sequelize";
import { postgresURL } from "../../config/envHandler";
import pg from "pg";
import { TaskModel } from "./task";

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
  initializeTaskModel(db);

  return db;
}

function initializeTaskModel(db: Sequelize) {
  TaskModel.init(
    {
      taskId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: DataTypes.STRING(512),
      ownerId: DataTypes.STRING(512),
      solved: DataTypes.BOOLEAN,
    },
    {
      sequelize: db,
      modelName: "TaskModel",
      tableName: "tasks",
    }
  );
}
