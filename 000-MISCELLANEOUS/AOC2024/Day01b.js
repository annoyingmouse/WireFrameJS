import { input } from "./inputs/Day01Input.js";
// const input = `3   4
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
  for (let i = 0; i < arrs.as.length; i++) {
    arrs.cs.push(arrs.as[i] * arrs.bs.filter((x) => x === arrs.as[i]).length);
  }
  console.log(arrs.cs.reduce((acc, curr) => acc + curr, 0));
})();
