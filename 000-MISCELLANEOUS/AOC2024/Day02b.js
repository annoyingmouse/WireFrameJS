import {
  diff,
  isAscending,
  isDescending,
  largeJump,
  checkSafe,
} from "./utils/utils.js";
import { input } from "./inputs/Day02Input.js";
// const input = `7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9`;
(() => {
  const reports = input.split("\n").map((x) => x.split(" ").map(Number));

  const creatSubArrays = (arr) => {
    const arrs = [arr];
    for (let i = 0; i < arr.length; i++) {
      const temp = [...arr];
      temp.splice(i, 1);
      arrs.push(temp);
    }
    return arrs;
  };
  const checkSafe = (report) => {
    const subArrays = creatSubArrays(report);
    return subArrays.some((subArray) => {
      if (isAscending(subArray) || isDescending(subArray)) {
        return subArray.slice(1).every((x, i) => !largeJump(subArray[i], x));
      }
      return false;
    });
  };

  const safeReport = reports.filter((report) => checkSafe(report));
  console.log("total:", safeReport.length);
})();
