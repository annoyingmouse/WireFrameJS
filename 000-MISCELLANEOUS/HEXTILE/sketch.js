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

  const drawHexagon = (cX, cY, r, colour) => {
    p5.push();
    p5.beginShape();
    p5.strokeWeight(r / 2);
    p5.stroke(colour);
    for (let a = 0; a < p5.TAU; a += p5.TAU / 6) {
      p5.vertex(cX + r * p5.cos(a), cY + r * p5.sin(a));
    }
    p5.endShape(p5.CLOSE);
    p5.pop();
  };

  const makeGrid = () => {
    let count = 0;
    for (let y = 0; y < gridHeight; y += hexSize / 2.3) {
      for (let x = 0; x < gridWidth; x += hexSize * 1.5) {
        console.log(x);
        if (
          y > hexSize / 2.3 &&
          y < gridHeight - hexSize / 2.3 &&
          x !== 0 &&
          x < gridWidth - hexSize * 1.5
        ) {
          drawHexagon(
            x + hexSize * (count % 2 == 0) * 0.75,
            y,
            hexSize / 2,
            "#ff00ff",
          );
        } else {
          drawHexagon(
            x + hexSize * (count % 2 == 0) * 0.75,
            y,
            hexSize / 2,
            "#00ffff",
          );
        }
      }
      count++;
    }
  };

  p5.draw = () => {
    p5.background(255);
    p5.stroke(255);
    p5.noFill();
    makeGrid();
    p5.noLoop();
  };
});
