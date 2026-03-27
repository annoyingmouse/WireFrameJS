const MAX_NUMBER = 99;
const MIN_NUMBER = 0;
const RANGE_SIZE = MAX_NUMBER - MIN_NUMBER + 1;
let currentNumber = 50;
let zerosHitCount1 = 0;
let zerosHitCount2 = 0;
let input = ``;

import fs from "fs";

(async () => {
  const input = await fs.promises.readFile("./test.txt", "utf-8");
  // const input = await fs.promises.readFile("./input.txt", "utf-8");
  const lines = input.split("\n");
  for (const line of lines) {
    const direction = line[0];
    const number = Number(line.replace(/^L|R/, ""));
    const stepDirection = direction === "R" ? 1 : -1;
    for (let i = 0; i < number; i++) {
      currentNumber += stepDirection;
      currentNumber =
        ((((currentNumber - MIN_NUMBER) % RANGE_SIZE) + RANGE_SIZE) %
          RANGE_SIZE) +
        MIN_NUMBER;
      if (currentNumber === 0) {
        zerosHitCount2++;
      }
    }
    console.log(`After line "${line}", currentNumber is: ${currentNumber}`);
    if (currentNumber === 0) {
      zerosHitCount1++;
    }
  }
  console.log(`Part 1: ${zerosHitCount1}`);
  console.log(`Part 2: ${zerosHitCount2}`);
})();
