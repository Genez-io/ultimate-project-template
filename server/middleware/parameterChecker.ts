import { z } from "zod";
export function ParameterCheckerMiddleware(_dict: any = {}) {
  return function (value: Function, _context: any) {
    return function (...args: any[]) {
      const GnzContextSchema = z.object({
        token: z.string(),
      });
      const CreateTaskRequestSchema = z.object({
        title: z.string(),
        solved: z.boolean(),
      });
      const UpdateTaskRequestSchema = z.object({
        id: z.string(),
      });
      switch (_context.name) {
        case "createTask":
          if (args.length !== 2) {
            throw new Error("Invalid parameters");
          }
          CreateTaskRequestSchema.parse(args[1]);
          GnzContextSchema.parse(args[0]);
          break;
        case "readTasks":
          if (args.length !== 1) {
            throw new Error("Invalid parameters");
          }
          GnzContextSchema.parse(args[0]);
          break;
        case "updateTask":
          if (args.length !== 2) {
            throw new Error("Invalid parameters");
          }
          GnzContextSchema.parse(args[0]);
          UpdateTaskRequestSchema.parse(args[1]);
          break;
        case "deleteTask":
          if (args.length !== 2) {
            throw new Error("Invalid parameters");
          }
          GnzContextSchema.parse(args[0]);
          z.string().parse(args[1]);
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
