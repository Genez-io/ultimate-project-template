import { GenezioDeploy, GenezioMethod } from "@genezio/types";
import mongoose, { Model } from "mongoose";
import { mongoURL } from "../config/envHandler";
import { Task, taskSchema } from "../db/mongooseModel";

@GenezioDeploy()
export class MongoCrons {
  private model: Model<any, any>;

  constructor() {
    mongoose.connect(mongoURL);
    this.model = mongoose.connection.model("Task", taskSchema);
  }

  @GenezioMethod({ type: "cron", cronString: "* * * * *" })
  async logTasks(): Promise<void> {
    // Implementation for reading tasks
    let tasks: Task[];
    try {
      tasks = await this.model.find().exec();
      console.log("Tasks: ", tasks);
    } catch (error: any) {
      console.log("An error occurred while reading tasks: ", error);
    }
  }
}
