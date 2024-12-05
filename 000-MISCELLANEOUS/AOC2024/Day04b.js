import { input } from "./inputs/Day04Input.js";
// const input = `MMMSXXMASM
// MSAMXMSMSA
// AMXSXMAAMM
// MSAMASMSMX
// XMASAMXAMM
// XXAMMXXAMA
// SMSMSASXSS
// SAXAMASAAA
// MAMMMXMMMM
// MXMXAXMASX`;

(() => {
  // Not mine: https://pastebin.com/X4vKGyXs
  const grid = input.split("\n").map((x) => x.split(""));
  const rows = grid.length;
  const cols = grid[0].length;
  const part2 = (grid) => {
    let count = 0;
    for (let x = 1; x < rows - 1; x++) {
      for (let y = 1; y < cols - 1; y++) {
        if (grid[x][y] === "A") {
          const tlbr =
            (grid[x - 1][y - 1] === "M" && grid[x + 1][y + 1] === "S") ||
            (grid[x - 1][y - 1] === "S" && grid[x + 1][y + 1] === "M");
          const trbl =
            (grid[x - 1][y + 1] === "M" && grid[x + 1][y - 1] === "S") ||
            (grid[x - 1][y + 1] === "S" && grid[x + 1][y - 1] === "M");
          if (tlbr && trbl) count++;
        }
      }
    }
    return count;
  };

  console.log(part2(grid));
})();
