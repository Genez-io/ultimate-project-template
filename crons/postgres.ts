import { GenezioDeploy, GenezioMethod } from "@genezio/types";
import { postgresURL } from "../config/development";
import { PostgresService } from "../services/postgresService";
import { Sequelize } from "sequelize";
import pg from "pg";
import PostgresRepository from "../repositories/postgres";
import { GetTasksResponse } from "../dtos/task";

@GenezioDeploy()
export class PostgresWebhooks {
  private postgresService: PostgresService;

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
    const repository = new PostgresRepository(db);
    this.postgresService = new PostgresService(repository);
  }

  @GenezioMethod({ type: "cron", cronString: "* * * * *" })
  async readTasks(): Promise<GetTasksResponse> {
    // Implementation for reading tasks
    let tasks;
    try {
      tasks = await this.postgresService.readTasks();
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
