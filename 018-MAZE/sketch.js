import Cell from "./Cell.js";

new p5((p5) => {
  const width = 600;
  const height = 600;
  const w = 40;
  const cols = Math.floor(width / w);
  const rows = Math.floor(height / w);
  const grid = [];
  let current = null;
  const stack = [];

  p5.setup = () => {
    p5.createCanvas(width, height);
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < rows; i++) {
        grid.push(new Cell(p5, i, j, w, cols));
      }
    }
    current = grid[0];
  };

  p5.draw = () => {
    p5.background(0);
    for (let cell = 0; cell < grid.length; cell++) {
      grid[cell].draw();
    }
    current.visited = true;
    current.highlight();
    let next = current.checkNeighbours(grid);
    if (next) {
      next.visited = true;
      stack.push(current);
      if (current.i - next.i === 1) {
        current.walls.left = false;
        next.walls.right = false;
      }
      if (current.i - next.i === -1) {
        current.walls.right = false;
        next.walls.left = false;
      }
      if (current.j - next.j === 1) {
        current.walls.top = false;
        next.walls.bottom = false;
      }
      if (current.j - next.j === -1) {
        current.walls.bottom = false;
        next.walls.top = false;
      }
      current = next;
    } else if (stack.length > 0) {
      current = stack.pop();
    }
  };
});
