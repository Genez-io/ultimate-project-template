export type RateLimiterOptionsParameters =
  | {}
  | { type: "jsonrpc" | "http" }
  | { tye: "cron"; cronString: string };

// Decorator that marks that a method should be deployed using genezio.
export function RateLimiter(_dict: RateLimiterOptionsParameters = {}) {
  return function (value: Function, _context: any) {
    console.log("value is", JSON.stringify(value));
    console.log("context is", JSON.stringify(_context));
    return function (...args: any[]) {
      console.log("args is", JSON.stringify(args));
      console.log("value when called is", JSON.stringify(value));
      console.log("context when called is is", JSON.stringify(_context));
      // @ts-expect-error
      const func = value.bind(this);
      const result = func(...args);
      return result;
    };
  };
}
