import { Model } from "sequelize";

export class TaskModel extends Model {
  taskId!: number;
  title!: string;
  ownerId!: string;
  solved!: boolean;
  date!: Date;
}

export type Task = {
  title: string;
  ownerId: string;
  solved: boolean;
  date: Date;
};
