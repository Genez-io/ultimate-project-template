export function DateCheckerMiddleware(_dict: any = {}) {
  return function (value: Function, _context: any) {
    return function (...args: any[]) {
      const date = new Date();
      if (date.getFullYear() > 2021) {
        console.log("Date is valid");
      } else {
        throw new Error("Date is invalid");
      }
      // @ts-expect-error
      const func = value.bind(this);
      const result = func(...args);
      return result;
    };
  };
}
