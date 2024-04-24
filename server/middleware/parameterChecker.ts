import { CreateTaskRequest, UpdateTaskRequest } from "../dtos/task";

export function ParameterCheckerMiddleware(_dict: any = {}) {
  return function (value: Function, _context: any) {
    return function (...args: any[]) {
      switch (_context.name) {
        case "createTask":
          if (
            args.length !== 2 ||
            (args.length === 2 &&
              ((args[1] as CreateTaskRequest).title == undefined ||
                (args[1] as CreateTaskRequest).solved == undefined))
          ) {
            throw new Error("Invalid parameters");
          }
          if (args.length === 2 && !args[0].token) {
            throw new Error("First argument needs to be a GnzContext object");
          }
          break;
        case "readTasks":
          if (args.length !== 1) {
            throw new Error("Invalid parameters");
          }
          if (args.length === 1 && !args[0].token) {
            throw new Error("First argument needs to be a GnzContext object");
          }
          break;
        case "updateTask":
          if (
            args.length !== 2 ||
            (args.length === 2 &&
              (args[1] as UpdateTaskRequest).id == undefined)
          ) {
            throw new Error("Invalid parameters");
          }
          if (args.length === 2 && !args[0].token) {
            throw new Error("First argument needs to be a GnzContext object");
          }
          break;
        case "deleteTask":
          if (
            args.length !== 2 ||
            (args.length === 2 && args[1] == undefined)
          ) {
            throw new Error("Invalid parameters");
          }
          if (args.length === 2 && !args[0].token) {
            throw new Error("First argument needs to be a GnzContext object");
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
