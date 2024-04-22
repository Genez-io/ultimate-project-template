import { Task, taskSchema } from "../db/mongooseModel";
import { GenezioDeploy } from "@genezio/types";
import mongoose, { Model } from "mongoose";
import { mongoURL } from "../config/envHandler";
import {
  CreateTaskRequest,
  CreateTaskResponse,
  DeleteTaskResponse,
  GetTasksResponse,
  UpdateTaskRequest,
  UpdateTaskResponse,
} from "../dtos/task";
import { DateCheckerMiddleware } from "../middleware/dateChecker";
import { ParameterCheckerMiddleware } from "../middleware/parameterChecker";

@GenezioDeploy()
export class MongoService {
  private model: Model<any, any>;

  constructor() {
    mongoose.connect(mongoURL);
    this.model = mongoose.connection.model("Task", taskSchema);
  }

  @ParameterCheckerMiddleware()
  @DateCheckerMiddleware()
  async createTask(task: CreateTaskRequest): Promise<CreateTaskResponse> {
    // Implementation for creating a task
    task.date = new Date();
    let createdTask: Task;
    try {
      createdTask = await this.model.create(task);
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

  @ParameterCheckerMiddleware()
  @DateCheckerMiddleware()
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

  @DateCheckerMiddleware()
  @ParameterCheckerMiddleware()
  async updateTask(
    updatedTask: UpdateTaskRequest
  ): Promise<UpdateTaskResponse> {
    // Implementation for updating a task
    updatedTask.date = new Date();
    let updatedTaskResponse: Task;
    try {
      updatedTaskResponse = await this.model
        .findByIdAndUpdate(updatedTask.id, updatedTask, { new: true })
        .exec();
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
    return {
      success: true,
      task: updatedTaskResponse,
    };
  }

  @ParameterCheckerMiddleware()
  @DateCheckerMiddleware()
  async deleteTask(taskId: string): Promise<DeleteTaskResponse> {
    // Implementation for deleting a task
    try {
      await this.model.findByIdAndDelete(taskId).exec();
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
