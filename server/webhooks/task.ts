import {
  GenezioDeploy,
  GenezioHttpResponse,
  GenezioMethod,
} from "@genezio/types";
import { Model } from "mongoose";
import { Task as TaskMongo } from "../db/mongooseModel";
import { connectMongo, connectPostgres } from "../db";
import { ModelStatic } from "sequelize";
import { TaskModel, Task as TaskPostgres } from "../db/sequelizeModel";

@GenezioDeploy()
export class TaskWebhooks {
  private modelMongo: Model<any, any>;
  private modelPostgres: ModelStatic<TaskModel>;

  constructor() {
    this.modelMongo = connectMongo();
    this.modelPostgres = connectPostgres();
    this.modelPostgres.sync();
  }

  @GenezioMethod({ type: "http" })
  async readTasksMongo(): Promise<GenezioHttpResponse> {
    // Implementation for reading tasks
    let tasks: TaskMongo[];
    try {
      tasks = await this.modelMongo.find().exec();
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

  @GenezioMethod({ type: "http" })
  async readTasksPostgres(): Promise<GenezioHttpResponse> {
    // Implementation for reading tasks
    let tasks: TaskPostgres[];
    try {
      tasks = await this.modelPostgres.findAll();
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
