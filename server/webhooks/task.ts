import {
  GenezioDeploy,
  GenezioHttpResponse,
  GenezioMethod,
} from "@genezio/types";
import { TaskModel as TaskMongo } from "../db/mongoose/task";
import { TaskModel as TaskPostgres } from "../db/sequelize/task";
import { connectMongo } from "../db/mongoose/connect";
import { connectPostgres } from "../db/sequelize/connect";

@GenezioDeploy()
export class TaskWebhooks {
  constructor() {
    connectMongo();
    connectPostgres();
  }

  @GenezioMethod({ type: "http" })
  async readTasksMongo(): Promise<GenezioHttpResponse> {
    // Implementation for reading tasks

    const tasks = await TaskMongo.find().catch((error) => {
      console.log("Error reading tasks", error);
      return null;
    });

    if (!tasks)
      return {
        statusCode: "500",
        body: {
          success: false,
          error: "Error reading tasks",
          tasks: [],
        },
      };

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

    const tasks = await TaskPostgres.findAll().catch((error) => {
      console.log("Error reading tasks", error);
      return null;
    });
    if (!tasks)
      return {
        statusCode: "500",
        body: {
          success: false,
          error: "Error reading tasks",
          tasks: [],
        },
      };
    return {
      statusCode: "200",
      body: {
        success: true,
        tasks: tasks,
      },
    };
  }
}
