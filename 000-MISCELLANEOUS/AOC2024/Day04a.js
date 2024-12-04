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
  function validCoord(x, y, m, n) {
    return x >= 0 && x < m && y >= 0 && y < n;
  }

  // This function searches for the given word
  // in a given direction from the coordinate.
  function findWord(index, word, grid, x, y, dirX, dirY) {
    // if word has been found
    if (index === word.length) return true;

    // if the current coordinate is
    // valid and characters match, then
    // check the next index
    if (
      validCoord(x, y, grid.length, grid[0].length) &&
      word[index] === grid[x][y]
    )
      return findWord(index + 1, word, grid, x + dirX, y + dirY, dirX, dirY);

    return false;
  }

  // This function calls search2D for each coordinate
  function searchWord(grid, word) {
    let m = grid.length;
    let n = grid[0].length;

    let ans = [];

    // x and y are used to set the direction in which
    // word needs to be searched.
    let x = [-1, -1, -1, 0, 0, 1, 1, 1];
    let y = [-1, 0, 1, -1, 1, -1, 0, 1];

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        // Search in all 8 directions
        for (let k = 0; k < 8; k++) {
          // If word is found, then append the
          // coordinates into answer and break.
          if (findWord(0, word, grid, i, j, x[k], y[k])) {
            ans.push([i, j]);
            // break;
          }
        }
      }
    }

    return ans;
  }

  function printResult(ans) {
    for (let i = 0; i < ans.length; i++) {
      console.log("{" + ans[i][0] + "," + ans[i][1] + "}");
    }
  }

  const grid = input.split("\n").map((x) => x.split(""));
  const ans = searchWord(grid, "XMAS");
  console.log(ans);
})();
