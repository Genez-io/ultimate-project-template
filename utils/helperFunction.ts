import { Task } from "../models/mongooseModel";

export function filterTasksByDate(tasks: Task[], date: Date) {
  return tasks.filter(
    (task) => task.date.toDateString() === date.toDateString()
  );
}
