import { Task } from "../db/mongoose/task";

export function filterTasksByTitle(tasks: Task[], title: string) {
  return tasks.filter((task) => task.title === title);
}
