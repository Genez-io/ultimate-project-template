import { GenezioDeploy, GenezioMethod } from "@genezio/types";
import { postgresURL } from "../config/envHandler";
import { DataTypes, ModelStatic, Sequelize } from "sequelize";
import pg from "pg";
import { Task, TaskModel } from "../db/sequelizeModel";

@GenezioDeploy()
export class PostgresCrons {
  private model: ModelStatic<TaskModel>;

  constructor() {
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
    this.model = TaskModel.init(
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

  @GenezioMethod({ type: "cron", cronString: "* * * * *" })
  async logTasks(): Promise<void> {
    // Implementation for reading tasks
    let tasks: Task[];
    try {
      tasks = await this.model.findAll();
      console.log("Tasks: ", tasks);
    } catch (error: any) {
      console.log("An error occurred while reading tasks: ", error);
    }
  }
}
