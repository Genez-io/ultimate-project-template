import {
  GenezioDeploy,
  GenezioHttpResponse,
  GenezioMethod,
} from "@genezio/types";
import { postgresURL } from "../config/development";
import { PostgresService } from "../services/postgresService";
import { Sequelize } from "sequelize";
import pg from "pg";
import PostgresRepository from "../repositories/postgres";

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

  @GenezioMethod({ type: "http" })
  async readTasks(): Promise<GenezioHttpResponse> {
    // Implementation for reading tasks
    let tasks;
    try {
      tasks = await this.postgresService.readTasks();
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
