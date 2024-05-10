/* eslint-disable */
import { ZodObject } from "zod";
export function ParameterCheckerMiddleware(_dict: ZodObject<any>[] = []) {
  return function (value: Function, _context: any) {
    return function (...args: any[]) {
      let zodIndex = 0;
      for (let i = 0; i < args.length; i++) {
        if (args[i].isGnzContext) {
          continue;
        }
        if (zodIndex >= _dict.length) {
          break;
        }
        _dict[zodIndex].parse(args[i]);
        zodIndex++;
      }

      // @ts-expect-error this is a valid call
      const func = value.bind(this);
      const result = func(...args);
      return result;
    };
  };
}
