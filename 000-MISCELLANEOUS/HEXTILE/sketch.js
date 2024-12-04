import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";

new p5((p5) => {
  let w = null;
  let gridWidth, gridHeight;
  let hexSize = 50;
  p5.setup = () => {
    w = p5.min(p5.windowWidth, p5.windowHeight);
    gridWidth = w;
    gridHeight = w;
    p5.createCanvas(w, w);
    hexSize = w / 10;
  };

  const drawHexagon = (cX, cY, r) => {
    p5.beginShape();
    for (let a = 0; a < p5.TAU; a += p5.TAU / 6) {
      p5.vertex(cX + r * p5.cos(a), cY + r * p5.sin(a));
    }
    p5.endShape(p5.CLOSE);
  };

  const makeGrid = () => {
    let count = 0;
    for (let y = 0; y < gridHeight; y += hexSize / 2.3) {
      for (let x = 0; x < gridWidth; x += hexSize * 1.5) {
        drawHexagon(x + hexSize * (count % 2 == 0) * 0.75, y, hexSize / 2);
      }
      count++;
    }
  };

  p5.draw = () => {
    p5.background(0);
    p5.stroke(255);
    p5.noFill();
    makeGrid();
    p5.noLoop();
  };
});
