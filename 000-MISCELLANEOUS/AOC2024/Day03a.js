import { input } from "./inputs/Day03Input.js";
// const input = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
(() => {
  const regex = /mul\((\d+),(\d+)\)/g;
  let match;
  let result = 0;
  while ((match = regex.exec(input)) !== null) {
    result += match[1] * match[2];
  }
  console.log(result);
})();
