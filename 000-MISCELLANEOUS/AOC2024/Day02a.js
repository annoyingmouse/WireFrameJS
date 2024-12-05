import { checkSafe } from "./utils/utils.js";
import { input } from "./inputs/Day02Input.js";
// const input = `7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9`;
(() => {
  const reports = input.split("\n").map((x) => x.split(" ").map(Number));
  const safeReport = reports.filter((report) => checkSafe(report));
  console.log("total:", safeReport.length);
})();
