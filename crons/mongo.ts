import { GenezioDeploy, GenezioMethod } from "@genezio/types";
import mongoose, { Model } from "mongoose";
import { mongoURL } from "../config/envHandler";
import { GetTasksResponse } from "../dtos/task";
import { Task, taskSchema } from "../db/mongooseModel";

@GenezioDeploy()
export class MongoCrons {
  private model: Model<any, any>;

  constructor() {
    mongoose.connect(mongoURL);
    this.model = mongoose.connection.model("Task", taskSchema);
  }

  @GenezioMethod({ type: "cron", cronString: "* * * * *" })
  async readTasks(): Promise<GetTasksResponse> {
    // Implementation for reading tasks
    let tasks: Task[];
    try {
      tasks = await this.model.find().exec();
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        tasks: [],
      };
    }
    return {
      success: true,
      tasks: tasks,
    };
  }
}
