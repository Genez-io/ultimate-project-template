import { DataTypes } from "sequelize";
import { connectPostgres } from "./connect";
import { TaskModel } from "./task";

export function initTables() {
  // This function should create the tables in the database
  // It should be called when the server starts
  // It should not drop the tables if they already exist
  // It should not throw an error if the tables already exist
  const db = connectPostgres();
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
  TaskModel.sync();
}
