import { Task, TaskModel } from "../db/sequelizeModel";
import { GenezioDeploy } from "@genezio/types";
import { DataTypes, ModelStatic, Sequelize } from "sequelize";
import { postgresURL } from "../config/envHandler";
import pg from "pg";
import {
  CreateTaskRequestPostgres,
  CreateTaskResponse,
  GetTasksResponse,
  UpdateTaskRequest,
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

  async createTask(
    task: CreateTaskRequestPostgres
  ): Promise<CreateTaskResponse> {
    // Implementation for creating a task
    task.taskId = await this.#generateUniqueId();
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

  async readTasks(): Promise<GetTasksResponse> {
    // Implementation for reading tasks
    let tasks: Task[];
    try {
      tasks = await this.model.findAll();
    } catch (error: any) {
      throw error;
    }
    return {
      tasks: tasks,
    };
  }

  async updateTask(
    updatedTask: UpdateTaskRequestPostgres
  ): Promise<UpdateTaskResponsePostgres> {
    // Implementation for updating a task
    updatedTask.date = new Date();
    let updatedTaskResponse;
    try {
      updatedTaskResponse = await this.model.update(updatedTask, {
        where: { taskId: updatedTask.id },
      });
    } catch (error: any) {
      throw error;
    }
    return {
      modifiedRows: updatedTaskResponse,
    };
  }

  async deleteTask(taskId: number): Promise<void> {
    // Implementation for deleting a task
    try {
      await this.model.destroy({ where: { taskId: taskId } });
    } catch (error: any) {
      throw error;
    }
  }
}
