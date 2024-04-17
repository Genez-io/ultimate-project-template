import {
  GenezioDeploy,
  GenezioHttpRequest,
  GenezioHttpResponse,
  GenezioMethod,
} from "@genezio/types";
import mongoose, { Model } from "mongoose";
import { mongoURL } from "../config/envHandler";
import { Task, taskSchema } from "../db/mongooseModel";

@GenezioDeploy()
export class MongoWebhooks {
  private model: Model<any, any>;

  constructor() {
    mongoose.connect(mongoURL);
    this.model = mongoose.connection.model("Task", taskSchema);
  }

  @GenezioMethod({ type: "http" })
  async readTasks(req: GenezioHttpRequest): Promise<GenezioHttpResponse> {
    if (!req) {
      return {
        statusCode: "400",
        body: {
          success: false,
          error: "Bad request",
        },
      };
    }
    // Implementation for reading tasks
    let tasks: Task[];
    try {
      tasks = await this.model.find().exec();
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
