import { DataTypes, Sequelize, ModelStatic } from "sequelize";
import { Task, TaskModel } from "../models/sequelizeModel";

export class PostgresRepository {
  private model: ModelStatic<TaskModel>;

  constructor(connection: Sequelize) {
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
        sequelize: connection,
        modelName: "TaskModel",
        tableName: "tasks",
      }
    );
  }

  async create(data: Task): Promise<TaskModel> {
    return this.model.create(data);
  }

  async findById(id: number): Promise<TaskModel | null> {
    return this.model.findByPk(id);
  }

  async findAll(): Promise<TaskModel[]> {
    return this.model.findAll();
  }

  async update(id: number, data: Partial<Task>): Promise<[number]> {
    return this.model.update(data, { where: { taskId: id } });
  }

  async delete(id: number): Promise<number> {
    return this.model.destroy({ where: { taskId: id } });
  }
}

export default PostgresRepository;
