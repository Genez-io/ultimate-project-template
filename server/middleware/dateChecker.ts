import { GenezioError } from "@genezio/types";

/* eslint-disable */
export function DateCheckerMiddleware(startDate: Date, endDate: Date) {
  return function (value: Function, _context: any) {
    return function (...args: any[]) {
      const date = new Date();
      if (date >= startDate && date <= endDate) {
        console.log("Date is valid");
      } else {
        throw new GenezioError(
          `Date is not valid. Start date: ${startDate}, End date: ${endDate}`
        );
      }

      // @ts-expect-error This is a valid call
      const func = value.bind(this);
      const result = func(...args);
      return result;
    };
  };
}
