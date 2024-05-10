import mongoose from "mongoose";

export const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
    solved: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

export type Task = {
  id?: string;
  ownerId: string;
  title: string;
  solved: boolean;
};

export const TaskModel = mongoose.model("Task", taskSchema);
