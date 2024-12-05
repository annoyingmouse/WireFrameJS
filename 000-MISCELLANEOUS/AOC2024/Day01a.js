import { input } from "./inputs/Day01Input.js";
import { diff } from "./utils/utils.js";
//   const input = `3   4
// 4   3
// 2   5
// 1   3
// 3   9
// 3   3`;
(() => {
  const arrs = input.split("\n").reduce(
    (acc, curr) => {
      const [a, b] = curr.split("   ").map(Number);
      acc.as.push(a);
      acc.bs.push(b);
      return acc;
    },
    {
      as: [],
      bs: [],
      cs: [],
    },
  );
  arrs.as.sort((a, b) => a - b);
  arrs.bs.sort((a, b) => a - b);
  for (let i = 0; i < arrs.as.length; i++) {
    arrs.cs.push(diff(arrs.as[i], arrs.bs[i]));
  }
  console.log(arrs.cs.reduce((acc, curr) => acc + curr, 0));
})();
