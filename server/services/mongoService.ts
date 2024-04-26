import { Task } from "../db/mongooseModel";
import { GenezioAuth, GenezioDeploy, GnzContext } from "@genezio/types";
import { Model } from "mongoose";
import {
  CreateTaskRequest,
  CreateTaskResponse,
  GetTasksResponse,
  UpdateTaskRequest,
  UpdateTaskResponse,
} from "../dtos/task";
import { DateCheckerMiddleware } from "../middleware/dateChecker";
import { ParameterCheckerMiddleware } from "../middleware/parameterChecker";
import { connectMongo } from "../db";

@GenezioDeploy()
export class MongoService {
  private model: Model<any, any>;

  constructor() {
    this.model = connectMongo();
  }

  @ParameterCheckerMiddleware()
  @DateCheckerMiddleware()
  @GenezioAuth()
  async createTask(
    context: GnzContext,
    task: CreateTaskRequest
  ): Promise<CreateTaskResponse> {
    // Implementation for creating a task
    const ownerId = context.user?.userId;
    if (!ownerId) throw new Error("User not found in the context.");
    task.date = new Date();
    task.ownerId = ownerId;
    let createdTask: Task;
    try {
      createdTask = await this.model.create(task);
    } catch (error: any) {
      throw error;
    }
    return {
      task: createdTask,
    };
  }

  @ParameterCheckerMiddleware()
  @DateCheckerMiddleware()
  @GenezioAuth()
  async readTasks(context: GnzContext): Promise<GetTasksResponse> {
    // Implementation for reading tasks
    const ownerId = context.user?.userId;
    if (!ownerId) throw new Error("User not found in the context.");
    let tasks: Task[];
    try {
      tasks = await this.model
        .find({
          ownerId: ownerId,
        })
        .exec();
    } catch (error: any) {
      throw error;
    }
    return {
      tasks: tasks,
    };
  }

  @DateCheckerMiddleware()
  @ParameterCheckerMiddleware()
  @GenezioAuth()
  async updateTask(
    context: GnzContext,
    updatedTask: UpdateTaskRequest
  ): Promise<UpdateTaskResponse> {
    // Implementation for updating a task
    const ownerId = context.user?.userId;
    if (!ownerId) throw new Error("User not found in the context.");

    updatedTask.date = new Date();
    const task = await this.model.findById(updatedTask.id).exec();
    if (task.ownerId !== ownerId)
      throw new Error("User not authorized to update this task.");
    let updatedTaskResponse: Task;
    try {
      updatedTaskResponse = await this.model
        .findByIdAndUpdate(updatedTask.id, updatedTask, { new: true })
        .exec();
    } catch (error: any) {
      throw error;
    }
    return {
      task: updatedTaskResponse,
    };
  }

  @ParameterCheckerMiddleware()
  @DateCheckerMiddleware()
  @GenezioAuth()
  async deleteTask(context: GnzContext, taskId: string): Promise<void> {
    // Implementation for deleting a task
    const ownerId = context.user?.userId;
    if (!ownerId) throw new Error("User not found in the context.");
    const task = await this.model.findById(taskId).exec();
    if (task.ownerId !== ownerId)
      throw new Error("User not authorized to delete this task.");
    try {
      await this.model.findByIdAndDelete(taskId).exec();
    } catch (error: any) {
      throw error;
    }
  }
}
