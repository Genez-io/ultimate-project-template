import { TaskModel } from "../db/mongoose/task";
import {
  GenezioAuth,
  GenezioDeploy,
  GenezioError,
  GnzContext,
} from "@genezio/types";
import {
  CreateTaskRequest,
  CreateTaskResponse,
  GetTasksResponse,
  UpdateTaskRequest,
  UpdateTaskResponse,
} from "../dtos/task";
import { DateCheckerMiddleware } from "../middleware/dateChecker";
import { ParameterCheckerMiddleware } from "../middleware/parameterChecker";
import { connectMongo } from "../db/mongoose/connect";
import { z } from "zod";

@GenezioDeploy()
export class MongoService {
  constructor() {
    connectMongo();
  }

  @ParameterCheckerMiddleware([
    z.object({
      title: z.string(),
      solved: z.boolean(),
      ownerId: z.string().optional(),
    }),
  ])
  @DateCheckerMiddleware(new Date(2021, 1, 1), new Date(2024, 12, 31))
  @GenezioAuth()
  async createTask(
    context: GnzContext,
    task: CreateTaskRequest
  ): Promise<CreateTaskResponse> {
    // Implementation for creating a task

    const ownerId = context.user?.userId;
    if (!ownerId) throw new GenezioError("User not found in the context.", 401);

    task.ownerId = ownerId;
    const createdTask = await TaskModel.create(task).catch((error) => {
      console.log("Error creating task in the db", error);
      throw new GenezioError("Error creating task in the db", 500);
    });

    return {
      task: {
        id: createdTask._id.toString(),
        ownerId: createdTask.ownerId,
        title: createdTask.title,
        solved: createdTask.solved,
      },
    };
  }

  @DateCheckerMiddleware(new Date(2021, 1, 1), new Date(2024, 12, 31))
  @GenezioAuth()
  async readTasks(context: GnzContext): Promise<GetTasksResponse> {
    // Implementation for reading tasks

    const ownerId = context.user?.userId;
    if (!ownerId) throw new GenezioError("User not found in the context.", 401);

    const tasks = await TaskModel.find({
      ownerId: ownerId,
    }).catch((error) => {
      console.log("Error reading tasks from the db", error);
      throw new GenezioError("Error reading tasks from the db", 500);
    });

    const responseTasks = tasks.map((task) => {
      return {
        id: task._id.toString(),
        ownerId: task.ownerId,
        title: task.title,
        solved: task.solved,
      };
    });

    return {
      tasks: responseTasks,
    };
  }

  @DateCheckerMiddleware(new Date(2021, 1, 1), new Date(2024, 12, 31))
  @ParameterCheckerMiddleware([
    z.object({
      id: z.string(),
      title: z.string().optional(),
      solved: z.boolean().optional(),
    }),
  ])
  @GenezioAuth()
  async updateTask(
    context: GnzContext,
    updatedTask: UpdateTaskRequest
  ): Promise<UpdateTaskResponse> {
    // Implementation for updating a task

    const ownerId = context.user?.userId;
    if (!ownerId) throw new GenezioError("User not found in the context.", 401);

    const task = await TaskModel.findById(updatedTask.id);
    if (!task || task.ownerId !== ownerId)
      throw new GenezioError("User not authorized to update this task.", 403);

    const updatedTaskResponse = await TaskModel.findByIdAndUpdate(
      updatedTask.id,
      updatedTask,
      { new: true }
    ).catch((error) => {
      console.log("Error updating task in the db", error);
      throw new GenezioError("Error updating task in the db", 500);
    });

    if (!updatedTaskResponse) {
      throw new GenezioError("Task not found", 404);
    }

    const responseTask = {
      id: updatedTaskResponse._id.toString(),
      ownerId: updatedTaskResponse.ownerId,
      title: updatedTaskResponse.title,
      solved: updatedTaskResponse.solved,
    };
    return {
      task: responseTask,
    };
  }

  @ParameterCheckerMiddleware([
    z.object({
      taskId: z.string(),
    }),
  ])
  @DateCheckerMiddleware(new Date(2021, 1, 1), new Date(2024, 12, 31))
  @GenezioAuth()
  async deleteTask(context: GnzContext, taskId: string): Promise<void> {
    // Implementation for deleting a task

    const ownerId = context.user?.userId;
    if (!ownerId) throw new GenezioError("User not found in the context.");

    const task = await TaskModel.findById(taskId);
    if (!task || task.ownerId !== ownerId)
      throw new GenezioError("User not authorized to delete this task.", 403);

    await TaskModel.findByIdAndDelete(taskId).catch((error) => {
      console.log("Error deleting task from the db", error);
      throw new GenezioError("Error deleting task from the db", 500);
    });
  }
}
