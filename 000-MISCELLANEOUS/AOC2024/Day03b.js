import { input } from "./inputs/Day03Input.js";
// const input = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
(() => {
  // const starts = [...indexOfSubstrings(input, "do()?")];
  // const stops = [...indexOfSubstrings(input, "don't()")];
  // console.log("starts", starts)
  // console.log("stops", stops)
  // let result = 0;
  // const regex = /mul\((\d+),(\d+)\)/g;
  // const chunks = [input.slice(0, stops[0])];
  // console.log(0, stops[0])
  // for (let i = 0; i < starts.length; i++) {
  //   const start = starts[i] + 5
  //   const end = stops.find(dN => dN > starts[i]);
  //   console.log(start, end)
  //   chunks.push(input.slice(start, end));
  // }
  // chunks.forEach(chunk => {
  //   console.log(chunk)
  //   let match;
  //   while ((match = regex.exec(chunk)) !== null) {
  //     result += match[1] * match[2];
  //   }
  // })
  // console.log(result);
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
