import { TaskModel } from "../db/sequelize/task";
import {
  GenezioAuth,
  GenezioDeploy,
  GenezioError,
  GnzContext,
} from "@genezio/types";
import {
  CreateTaskRequest,
  TaskResponse,
  UpdateTaskRequest,
  UpdateTaskResponsePostgres,
} from "../dtos/task";
import { connectPostgres } from "../db/sequelize/connect";
import { initTables } from "../db/sequelize/migration";

@GenezioDeploy()
export class PostgresService {
  constructor() {
    // This function is the way to connect to the database in production
    connectPostgres();

    // This function should not be used in production
    initTables();
  }

  @GenezioAuth()
  async createTask(
    context: GnzContext,
    task: CreateTaskRequest
  ): Promise<TaskResponse> {
    // Implementation for creating a task

    const ownerId = context.user?.userId;
    if (!ownerId)
      throw new GenezioError("User not logged in or session expired.", 401);

    task.ownerId = ownerId;
    const createdTask = await TaskModel.create(task).catch((error) => {
      console.log("Error creating task in the db", error);
      throw new GenezioError("An unknown error has occured", 500);
    });

    const taskResponse = {
      id: createdTask.taskId,
      ownerId: createdTask.ownerId,
      title: createdTask.title,
      solved: createdTask.solved,
    };

    return taskResponse;
  }

  @GenezioAuth()
  async readTasks(context: GnzContext): Promise<TaskResponse[]> {
    // Implementation for reading tasks

    const ownerId = context.user?.userId;
    if (!ownerId)
      throw new GenezioError("User not logged in or session expired.", 401);

    const tasks = await TaskModel.findAll({
      where: { ownerId: ownerId },
    }).catch((error) => {
      console.log("Error reading tasks from the db", error);
      throw new GenezioError("An unknown error has occured", 500);
    });

    const responseTasks = tasks.map((task) => {
      return {
        id: task.taskId,
        ownerId: task.ownerId,
        title: task.title,
        solved: task.solved,
      };
    });

    return responseTasks;
  }

  @GenezioAuth()
  async updateTask(
    context: GnzContext,
    updatedTask: UpdateTaskRequest
  ): Promise<UpdateTaskResponsePostgres> {
    // Implementation for updating a task

    const ownerId = context.user?.userId;
    if (!ownerId)
      throw new GenezioError("User not logged in or session expired.", 401);

    const updatedTaskResponse = await TaskModel.update(updatedTask, {
      where: { taskId: updatedTask.id, ownerId: ownerId },
    }).catch((error) => {
      console.log("Error updating task in the db", error);
      throw new GenezioError("An unknown error has occured", 500);
    });

    return {
      modifiedRows: updatedTaskResponse,
    };
  }

  @GenezioAuth()
  async deleteTask(context: GnzContext, taskId: string): Promise<void> {
    // Implementation for deleting a task

    const ownerId = context.user?.userId;
    if (!ownerId)
      throw new GenezioError("User not logged in or session expired.", 401);

    await TaskModel.destroy({
      where: { taskId: taskId, ownerId: ownerId },
    }).catch((error) => {
      console.log("Error deleting task in the db", error);
      throw new GenezioError("An unknown error has occured", 500);
    });
  }
}
