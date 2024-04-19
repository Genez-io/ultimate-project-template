export type RateLimiterOptionsParameters = { dbUrl: string };
import Redis from "ioredis";

// Decorator that marks that a method should be deployed using genezio.
export function RateLimiter(
  _dict: RateLimiterOptionsParameters = { dbUrl: "" }
) {
  return function (value: Function, _context: any) {
    return async function (...args: any[]) {
      if (args.length === 0 || !args[0].isGnzContext) {
        console.log(
          "Warning: the RateLimiter decorator must be used with the first parameter being a GnzContext object"
        );
      } else {
        try {
          const client = new Redis(_dict.dbUrl);
          const oldCount = await client.get(
            args[0].requestContext.http.sourceIp
          );

          await client.set(
            args[0].requestContext.http.sourceIp,
            oldCount ? parseInt(oldCount) + 1 : 1
          );
        } catch (error) {
          console.log(
            "Error when opperating on the redis client. Remember to set the Redis dbUrl parameter in the RateLimiter decorator."
          );
          console.log(error);
        }
      }

      // @ts-expect-error
      const func = value.bind(this);
      const result = func(...args);
      return result;
    };
  };
}
