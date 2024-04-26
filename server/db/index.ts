import { DataTypes, ModelStatic, Sequelize } from "sequelize";
import { mongoURL, postgresURL } from "../config/envHandler";
import pg from "pg";
import { TaskModel } from "./sequelizeModel";
import mongoose, { Model } from "mongoose";
import { taskSchema } from "./mongooseModel";

export function connectPostgres(): ModelStatic<TaskModel> {
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
  return TaskModel.init(
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
}

export function connectMongo(): Model<any, any> {
  mongoose.connect(mongoURL);
  return mongoose.connection.model("Task", taskSchema);
}
