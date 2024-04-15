import { Connection, Model, Document } from "mongoose";
import { Task, taskSchema } from "../models/mongooseModel";

class MongoRepository {
  private model: Model<any, any>;

  constructor(connection: Connection) {
    this.model = connection.model("Task", taskSchema);
  }

  async create(data: Partial<Task>): Promise<Task> {
    const document = new this.model(data);
    return document.save();
  }

  async findById(id: string): Promise<Task | null> {
    return this.model.findById(id).exec();
  }

  async findAll(): Promise<Task[]> {
    return this.model.find().exec();
  }

  async update(id: string, data: Partial<Task>): Promise<Task | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<Task | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}

export default MongoRepository;
