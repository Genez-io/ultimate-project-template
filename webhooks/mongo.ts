import {
  GenezioDeploy,
  GenezioHttpResponse,
  GenezioMethod,
} from "@genezio/types";
import { MongoService } from "../services/mongoService";
import MongoRepository from "../repositories/mongo";
import mongoose from "mongoose";
import { mongoURL } from "../config/development";

@GenezioDeploy()
export class MongoWebhooks {
  private mongoService: MongoService;

  constructor() {
    mongoose.connect(mongoURL);
    const db = mongoose.connection;
    const repository = new MongoRepository(db);
    this.mongoService = new MongoService(repository);
  }

  @GenezioMethod({ type: "http" })
  async readTasks(): Promise<GenezioHttpResponse> {
    // Implementation for reading tasks
    let tasks;
    try {
      tasks = await this.mongoService.readTasks();
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
