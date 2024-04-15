import { GenezioDeploy } from "@genezio/types";
import { postgresURL } from "../config/development";
import {
  CreateTaskRequest,
  CreateTaskRequestPostgres,
  CreateTaskResponse,
  DeleteTaskResponse,
  GetTasksResponse,
  UpdateTaskRequest,
  UpdateTaskResponsePostgres,
} from "../dtos/task";
import pg from "pg";
import { PostgresService } from "../services/postgresService";
import { Sequelize } from "sequelize";
import PostgresRepository from "../repositories/postgres";

@GenezioDeploy()
export class PostgresController {
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

  async createTask(
    task: CreateTaskRequestPostgres
  ): Promise<CreateTaskResponse> {
    // Implementation for creating a task
    task.date = new Date();
    let createdTask;
    try {
      createdTask = await this.postgresService.createTask(task);
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
    return {
      success: true,
      task: createdTask,
    };
  }

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

  async updateTask(
    updatedTask: UpdateTaskRequest
  ): Promise<UpdateTaskResponsePostgres> {
    // Implementation for updating a task
    updatedTask.date = new Date();
    let updatedTaskResponse;
    const id = parseInt(updatedTask.id);
    try {
      updatedTaskResponse = await this.postgresService.updateTask(
        id,
        updatedTask
      );
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
    return {
      success: true,
      modifiedRows: updatedTaskResponse,
    };
  }

  async deleteTask(taskId: string): Promise<DeleteTaskResponse> {
    // Implementation for deleting a task
    try {
      const id = parseInt(taskId);
      await this.postgresService.deleteTask(id);
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
    return {
      success: true,
    };
  }
}
