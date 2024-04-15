import MongoRepository from "../repositories/mongo";
import { Task } from "../models/mongooseModel";

export class MongoService {
  private taskRepository: MongoRepository;

  constructor(taskRepository: MongoRepository) {
    this.taskRepository = taskRepository;
  }

  async createTask(task: Partial<Task>) {
    // Implement create task logic here
    return await this.taskRepository.create(task);
  }

  async readTasks() {
    // Implement read tasks logic here
    return await this.taskRepository.findAll();
  }

  async updateTask(id: string, task: Partial<Task>) {
    // Implement update task logic here
    return await this.taskRepository.update(id, task);
  }

  async deleteTask(id: string) {
    // Implement delete task logic here
    return await this.taskRepository.delete(id);
  }
}
