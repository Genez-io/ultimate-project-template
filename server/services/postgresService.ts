import { Task, TaskModel } from "../db/sequelizeModel";
import { GenezioDeploy } from "@genezio/types";
import { DataTypes, ModelStatic, Sequelize } from "sequelize";
import { postgresURL } from "../config/envHandler";
import pg from "pg";
import {
  CreateTaskRequestPostgres,
  CreateTaskResponse,
  DeleteTaskResponse,
  GetTasksResponse,
  UpdateTaskRequest,
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

  async createTask(
    task: CreateTaskRequestPostgres
  ): Promise<CreateTaskResponse> {
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

  async readTasks(): Promise<GetTasksResponse> {
    // Implementation for reading tasks
    let tasks: Task[];
    try {
      tasks = await this.model.findAll();
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
  ): Promise<UpdateTaskResponsePostgres> {
    // Implementation for updating a task
    updatedTask.date = new Date();
    let updatedTaskResponse;
    const id = parseInt(updatedTask.id);
    try {
      updatedTaskResponse = await this.model.update(updatedTask, {
        where: { taskId: id },
      });
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
    return {
      success: true,
      modifiedRows: updatedTaskResponse,
    };
  }

  async deleteTask(taskId: string): Promise<DeleteTaskResponse> {
    // Implementation for deleting a task
    try {
      const id = parseInt(taskId);
      await this.model.destroy({ where: { taskId: id } });
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
