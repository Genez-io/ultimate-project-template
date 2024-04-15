import PostgresRepository from "../repositories/postgres";
import { Task } from "../models/sequelizeModel";

export class PostgresService {
  private taskRepository: PostgresRepository;

  constructor(taskRepository: PostgresRepository) {
    this.taskRepository = taskRepository;
  }

  async createTask(task: Task) {
    // Implement create task logic here
    return await this.taskRepository.create(task);
  }

  async readTasks() {
    // Implement read tasks logic here
    return await this.taskRepository.findAll();
  }

  async updateTask(id: number, task: Partial<Task>) {
    // Implement update task logic here
    return await this.taskRepository.update(id, task);
  }

  async deleteTask(id: number) {
    // Implement delete task logic here
    return await this.taskRepository.delete(id);
  }
}
