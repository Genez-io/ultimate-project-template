import { Task, TaskModel } from "../db/sequelizeModel";
import { GenezioAuth, GenezioDeploy, GnzContext } from "@genezio/types";
import { DataTypes, ModelStatic, Sequelize } from "sequelize";
import { postgresURL } from "../config/envHandler";
import pg from "pg";
import {
  CreateTaskRequestPostgres,
  CreateTaskResponse,
  GetTasksResponse,
  UpdateTaskRequestPostgres,
  UpdateTaskResponsePostgres,
} from "../dtos/task";

@GenezioDeploy()
export class PostgresService {
  private model: ModelStatic<TaskModel>;

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
    this.model = TaskModel.init(
      {
        taskId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        title: DataTypes.STRING(512),
        ownerId: DataTypes.STRING(512),
        solved: DataTypes.BOOLEAN,
        date: DataTypes.DATE,
      },
      {
        sequelize: db,
        modelName: "TaskModel",
        tableName: "tasks",
      }
    );
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
    if (!ownerId) throw new Error("User not found in the context.");
    task.taskId = await this.#generateUniqueId();
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

  @GenezioAuth()
  async readTasks(context: GnzContext): Promise<GetTasksResponse> {
    // Implementation for reading tasks
    const ownerId = context.user?.userId;
    if (!ownerId) throw new Error("User not found in the context.");
    let tasks: Task[];
    try {
      tasks = await this.model.findAll({
        where: { ownerId: ownerId },
      });
    } catch (error: any) {
      throw error;
    }
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
    if (!ownerId) throw new Error("User not found in the context.");

    updatedTask.date = new Date();
    let updatedTaskResponse;
    try {
      updatedTaskResponse = await this.model.update(updatedTask, {
        where: { taskId: updatedTask.id, ownerId: ownerId },
      });
    } catch (error: any) {
      throw error;
    }
    return {
      modifiedRows: updatedTaskResponse,
    };
  }

  @GenezioAuth()
  async deleteTask(context: GnzContext, taskId: number): Promise<void> {
    // Implementation for deleting a task
    const ownerId = context.user?.userId;
    if (!ownerId) throw new Error("User not found in the context.");

    try {
      await this.model.destroy({ where: { taskId: taskId, ownerId: ownerId } });
    } catch (error: any) {
      throw error;
    }
  }
}
