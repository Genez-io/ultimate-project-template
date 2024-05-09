/* eslint-disable */
export function DateCheckerMiddleware() {
  return function (value: Function, _context: any) {
    return function (...args: any[]) {
      const date = new Date();
      if (date.getFullYear() > 2021) {
        console.log("Date is valid");
      } else {
        throw new Error(
          `Date is invalid on method ${_context.name.toString()}`
        );
      }

      // @ts-expect-error This is a valid call
      const func = value.bind(this);
      const result = func(...args);
      return result;
    };
  };
}
