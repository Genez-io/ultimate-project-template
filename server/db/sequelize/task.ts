import { Model } from "sequelize";

export class TaskModel extends Model {
  taskId!: string;
  title!: string;
  ownerId!: string;
  solved!: boolean;
}

export type Task = {
  id?: string;
  title: string;
  ownerId: string;
  solved: boolean;
};
