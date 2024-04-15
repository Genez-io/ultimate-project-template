import { GenezioDeploy, GenezioMethod } from "@genezio/types";
import { MongoService } from "../services/mongoService";
import MongoRepository from "../repositories/mongo";
import mongoose from "mongoose";
import { mongoURL } from "../config/development";
import { GetTasksResponse } from "../dtos/task";

@GenezioDeploy()
export class MongoCrons {
  private mongoService: MongoService;

  constructor() {
    mongoose.connect(mongoURL);
    const db = mongoose.connection;
    const repository = new MongoRepository(db);
    this.mongoService = new MongoService(repository);
  }

  @GenezioMethod({ type: "cron", cronString: "* * * * *" })
  async readTasks(): Promise<GetTasksResponse> {
    // Implementation for reading tasks
    let tasks;
    try {
      tasks = await this.mongoService.readTasks();
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
