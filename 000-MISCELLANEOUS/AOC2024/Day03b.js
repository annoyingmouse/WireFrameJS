import { input } from "./inputs/Day03Input.js";
// const input = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
(() => {
  // Not mine: https://github.com/yolocheezwhiz/adventofcode/blob/main/2024/day03.js
  const filteredInput = ("do()" + input)
    .split("don't()")
    .flatMap((elem) => elem.split("do()").slice(1))
    .join();
  const regex = /mul\((\d+),(\d+)\)/g;
  let match;
  let result = 0;
  while ((match = regex.exec(filteredInput)) !== null) {
    result += match[1] * match[2];
  }
  console.log(result);

  // 51896032 is too LOW
})();
