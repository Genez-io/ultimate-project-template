import { GenezioDeploy } from "@genezio/types";
import { MongoService } from "../services/mongoService";
import MongoRepository from "../repositories/mongo";
import mongoose from "mongoose";
import { mongoURL } from "../config/development";
import {
  CreateTaskRequest,
  CreateTaskResponse,
  DeleteTaskResponse,
  GetTasksResponse,
  UpdateTaskRequest,
  UpdateTaskResponse,
} from "../dtos/task";

@GenezioDeploy()
export class MongoController {
  private mongoService: MongoService;

  constructor() {
    mongoose.connect(mongoURL);
    const db = mongoose.connection;
    const repository = new MongoRepository(db);
    this.mongoService = new MongoService(repository);
  }

  async createTask(task: CreateTaskRequest): Promise<CreateTaskResponse> {
    // Implementation for creating a task
    task.date = new Date();
    let createdTask;
    try {
      createdTask = await this.mongoService.createTask(task);
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

  async updateTask(
    updatedTask: UpdateTaskRequest
  ): Promise<UpdateTaskResponse> {
    // Implementation for updating a task
    updatedTask.date = new Date();
    let updatedTaskResponse;
    try {
      updatedTaskResponse = await this.mongoService.updateTask(
        updatedTask.id,
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
      task: updatedTaskResponse!,
    };
  }

  async deleteTask(taskId: string): Promise<DeleteTaskResponse> {
    // Implementation for deleting a task
    try {
      await this.mongoService.deleteTask(taskId);
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
