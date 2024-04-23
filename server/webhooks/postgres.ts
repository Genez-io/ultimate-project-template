import {
  GenezioDeploy,
  GenezioHttpResponse,
  GenezioMethod,
} from "@genezio/types";
import { postgresURL } from "../config/envHandler";
import { DataTypes, ModelStatic, Sequelize } from "sequelize";
import pg from "pg";
import { Task, TaskModel } from "../db/sequelizeModel";

@GenezioDeploy()
export class PostgresWebhooks {
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

  @GenezioMethod({ type: "http" })
  async readTasks(): Promise<GenezioHttpResponse> {
    // Implementation for reading tasks
    let tasks: Task[];
    try {
      tasks = await this.model.findAll();
    } catch (error: any) {
      return {
        statusCode: "500",
        body: {
          success: false,
          error: error.message,
          tasks: [],
        },
      };
    }
    return {
      statusCode: "200",
      body: {
        success: true,
        tasks: tasks,
      },
    };
  }
}
