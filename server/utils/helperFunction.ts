import { Task } from "../db/mongoose/task";

export function filterTasksByDate(tasks: Task[], date: Date) {
  return tasks.filter(
    (task) => task.date.toDateString() === date.toDateString()
  );
}
