import { Task, taskSchema } from "../db/mongooseModel";
import { GenezioDeploy, GnzContext } from "@genezio/types";
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
import { RateLimiter } from "../middleware/rateLimiter";

type Context = {
  isGnzContext: boolean;
};
@GenezioDeploy()
export class MongoService {
  private model: Model<any, any>;

  constructor() {
    mongoose.connect(mongoURL);
    this.model = mongoose.connection.model("Task", taskSchema);
  }

  @RateLimiter()
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

  @RateLimiter({
    dbUrl:
      "redis://default:2d8dc331d6d34969b56d35b6ceae5ce1@us1-ample-beetle-42556.upstash.io:42556",
  })
  async readTasks(context: GnzContext): Promise<GetTasksResponse> {
    // Implementation for reading tasks
    console.log("context is", JSON.stringify(context));
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
