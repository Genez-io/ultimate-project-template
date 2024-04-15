import mongoose from "mongoose";

export const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  solved: {
    type: Boolean,
    required: true,
    default: false,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export type Task = {
  _id?: string;
  title: string;
  solved: boolean;
  date: Date;
};

export const TaskModel =
  mongoose.models.Task || mongoose.model("Task", taskSchema);
