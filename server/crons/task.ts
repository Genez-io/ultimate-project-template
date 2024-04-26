import { GenezioDeploy, GenezioMethod } from "@genezio/types";
import { Model } from "mongoose";
import { Task as TaskMongo } from "../db/mongooseModel";
import { ModelStatic } from "sequelize";
import { TaskModel, Task as TaskPostgres } from "../db/sequelizeModel";
import { connectMongo, connectPostgres } from "../db";

@GenezioDeploy()
export class TaskCrons {
  private modelMongo: Model<any, any>;
  private modelPostgres: ModelStatic<TaskModel>;

  constructor() {
    this.modelMongo = connectMongo();
    this.modelPostgres = connectPostgres();
    this.modelPostgres.sync();
  }

  @GenezioMethod({ type: "cron", cronString: "0 0 * * *" })
  async logTasksMongo(): Promise<void> {
    // Implementation for reading tasks
    let tasks: TaskMongo[];
    try {
      tasks = await this.modelMongo.find().exec();
      console.log("Tasks: ", tasks);
    } catch (error: any) {
      console.log("An error occurred while reading tasks: ", error);
    }
  }

  @GenezioMethod({ type: "cron", cronString: "0 0 * * *" })
  async logTasksPostgres(): Promise<void> {
    // Implementation for reading tasks
    let tasks: TaskPostgres[];
    try {
      tasks = await this.modelPostgres.findAll();
      console.log("Tasks: ", tasks);
    } catch (error: any) {
      console.log("An error occurred while reading tasks: ", error);
    }
  }
}
