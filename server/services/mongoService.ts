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
      date: z.date().optional(),
    }),
  ])
  @DateCheckerMiddleware()
  @GenezioAuth()
  async createTask(
    context: GnzContext,
    task: CreateTaskRequest
  ): Promise<CreateTaskResponse> {
    // Implementation for creating a task
    const ownerId = context.user?.userId;
    if (!ownerId) throw new GenezioError("User not found in the context.", 401);
    task.date = new Date();
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
        date: createdTask.date,
      },
    };
  }

  @ParameterCheckerMiddleware()
  @DateCheckerMiddleware()
  @GenezioAuth()
  async readTasks(context: GnzContext): Promise<GetTasksResponse> {
    // Implementation for reading tasks
    const ownerId = context.user?.userId;
    if (!ownerId) throw new GenezioError("User not found in the context.", 401);

    const tasks = await TaskModel.find({
      ownerId: ownerId,
    })
      .exec()
      .then((tasks) => {
        return tasks.map((task) => {
          return {
            id: task._id.toString(),
            ownerId: task.ownerId,
            title: task.title,
            solved: task.solved,
            date: task.date,
          };
        });
      })
      .catch((error) => {
        console.log("Error reading tasks from the db", error);
        throw new GenezioError("Error reading tasks from the db", 500);
      });

    return {
      tasks: tasks,
    };
  }

  @DateCheckerMiddleware()
  @ParameterCheckerMiddleware([
    z.object({
      id: z.string(),
      title: z.string().optional(),
      solved: z.boolean().optional(),
      date: z.date().optional(),
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

    updatedTask.date = new Date();
    const task = await TaskModel.findById(updatedTask.id).exec();
    if (!task || task.ownerId !== ownerId)
      throw new GenezioError("User not authorized to update this task.", 403);

    const updatedTaskResponse = await TaskModel.findByIdAndUpdate(
      updatedTask.id,
      updatedTask,
      { new: true }
    )
      .exec()
      .then((task) => {
        return {
          id: task!._id.toString(),
          ownerId: task!.ownerId,
          title: task!.title,
          solved: task!.solved,
          date: task!.date,
        };
      })
      .catch((error) => {
        console.log("Error updating task in the db", error);
        throw new GenezioError("Error updating task in the db", 500);
      });

    return {
      task: updatedTaskResponse,
    };
  }

  @ParameterCheckerMiddleware([
    z.object({
      taskId: z.string(),
    }),
  ])
  @DateCheckerMiddleware()
  @GenezioAuth()
  async deleteTask(context: GnzContext, taskId: string): Promise<void> {
    // Implementation for deleting a task
    const ownerId = context.user?.userId;
    if (!ownerId) throw new GenezioError("User not found in the context.");
    const task = await TaskModel.findById(taskId).exec();
    if (!task || task.ownerId !== ownerId)
      throw new GenezioError("User not authorized to delete this task.", 403);

    await TaskModel.findByIdAndDelete(taskId)
      .exec()
      .catch((error) => {
        console.log("Error deleting task from the db", error);
        throw new GenezioError("Error deleting task from the db", 500);
      });
  }
}
