// export function DateCheckerMiddleware() {
//   return function (value: unknown) {
//     return function (...args: unknown[]) {
//       const date = new Date();
//       if (date.getFullYear() > 2021) {
//         console.log("Date is valid");
//       } else {
//         throw new Error("Date is invalid");
//       }

//       // @ts-expect-error This is a valid call
//       const func = value.bind(this);
//       const result = func(...args);
//       return result;
//     };
//   };
// }

export function DateCheckerMiddleware() {
  return function (value: unknown) {
    console.log(JSON.stringify(value, null, 2));
  };
}
