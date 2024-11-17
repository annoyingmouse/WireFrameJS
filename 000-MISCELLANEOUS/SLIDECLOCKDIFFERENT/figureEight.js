import { drawSquare } from "./drawSquare.js";

export const figureEight = (pg, x, y, unitWidth, unitHeight, orange) => {
  const figure = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];
  for (let y = 0; y < figure.length; y++) {
    for (let x = 0; x < figure[y].length; x++) {
      if (figure[y][x] === 1) {
        drawSquare(
          pg,
          x * unitWidth,
          y * unitHeight,
          unitWidth,
          unitHeight,
          orange,
          true,
        );
      }
    }
  }
};
