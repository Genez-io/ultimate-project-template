import { CreateTaskRequest, UpdateTaskRequest } from "../dtos/task";

export function ParameterCheckerMiddleware(_dict: any = {}) {
  return function (value: Function, _context: any) {
    return function (...args: any[]) {
      console.log(_context.name);
      switch (_context.name) {
        case "createTask":
          if (
            args.length !== 1 ||
            (args.length === 1 &&
              ((args[0] as CreateTaskRequest).title == undefined ||
                (args[0] as CreateTaskRequest).solved == undefined))
          ) {
            throw new Error("Invalid parameters");
          }
          break;
        case "readTasks":
          if (args.length !== 0) {
            throw new Error("Invalid parameters");
          }
          break;
        case "updateTask":
          if (
            args.length !== 1 ||
            (args.length === 1 &&
              (args[0] as UpdateTaskRequest).id == undefined)
          ) {
            throw new Error("Invalid parameters");
          }
          break;
        case "deleteTask":
          if (
            args.length !== 1 ||
            (args.length === 1 && args[0] == undefined)
          ) {
            throw new Error("Invalid parameters");
          }
          break;
        default:
          break;
      }
      // @ts-expect-error
      const func = value.bind(this);
      const result = func(...args);
      return result;
    };
  };
}
