import { TaskModel } from "../db/sequelize/task";
import {
  GenezioAuth,
  GenezioDeploy,
  GenezioError,
  GnzContext,
} from "@genezio/types";
import {
  CreateTaskRequestPostgres,
  CreateTaskResponse,
  GetTasksResponse,
  UpdateTaskRequestPostgres,
  UpdateTaskResponsePostgres,
} from "../dtos/task";
import { connectPostgres } from "../db/sequelize/connect";

@GenezioDeploy()
export class PostgresService {
  constructor() {
    connectPostgres();
  }

  async #generateUniqueId(): Promise<number> {
    const maxId: number = await TaskModel.max("taskId");
    if (maxId == null) {
      return 0;
    }
    return maxId + 1;
  }

  @GenezioAuth()
  async createTask(
    context: GnzContext,
    task: CreateTaskRequestPostgres
  ): Promise<CreateTaskResponse> {
    // Implementation for creating a task
    const ownerId = context.user?.userId;
    if (!ownerId) throw new GenezioError("User not found in the context.", 401);
    task.taskId = await this.#generateUniqueId();
    task.date = new Date();
    task.ownerId = ownerId;
    const createdTask = await TaskModel.create(task)
      .then((task) => {
        return task.get();
      })
      .catch((error) => {
        console.log("Error creating task in the db", error);
        throw new GenezioError("Error creating task in the db", 500);
      });

    return {
      task: createdTask,
    };
  }

  @GenezioAuth()
  async readTasks(context: GnzContext): Promise<GetTasksResponse> {
    // Implementation for reading tasks
    const ownerId = context.user?.userId;
    if (!ownerId) throw new GenezioError("User not found in the context.", 401);
    const tasks = await TaskModel.findAll({
      where: { ownerId: ownerId },
    })
      .then((tasks) => {
        return tasks.map((task) => {
          return task.get();
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

  @GenezioAuth()
  async updateTask(
    context: GnzContext,
    updatedTask: UpdateTaskRequestPostgres
  ): Promise<UpdateTaskResponsePostgres> {
    // Implementation for updating a task
    const ownerId = context.user?.userId;
    if (!ownerId) throw new GenezioError("User not found in the context.", 401);

    updatedTask.date = new Date();

    const updatedTaskResponse = await TaskModel.update(updatedTask, {
      where: { taskId: updatedTask.id, ownerId: ownerId },
    }).catch((error) => {
      console.log("Error updating task in the db", error);
      throw new GenezioError("Error updating task in the db", 500);
    });
    return {
      modifiedRows: updatedTaskResponse,
    };
  }

  @GenezioAuth()
  async deleteTask(context: GnzContext, taskId: number): Promise<void> {
    // Implementation for deleting a task
    const ownerId = context.user?.userId;
    if (!ownerId) throw new GenezioError("User not found in the context.", 401);

    await TaskModel.destroy({
      where: { taskId: taskId, ownerId: ownerId },
    }).catch((error) => {
      console.log("Error deleting task in the db", error);
      throw new GenezioError("Error deleting task in the db", 500);
    });
  }
}
