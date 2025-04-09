import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";
import { RotatingBlock } from "./RotatingBlock.js";
const distance = (x1, y1, x2, y2) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
};

new p5((p5) => {
  const main = document.querySelector("main");
  const verticalHeight = main.clientWidth;
  const backGroundColour = "#000000";
  const blockWidth = Math.floor(verticalHeight / 20);
  const blockHeight = blockWidth;
  let blocks = [];
  const distances = [];

  p5.setup = () => {
    p5.angleMode(p5.DEGREES);
    p5.createCanvas(verticalHeight, verticalHeight);
    p5.background(backGroundColour);
    const halfBlock = blockWidth / 2;
    const [centreX, centreY] = [verticalHeight / 2, verticalHeight / 2];
    for (
      let x = blockWidth, iteration_x = 0;
      x <= verticalHeight - blockWidth * 2, iteration_x < 18;
      x += blockWidth, iteration_x++
    ) {
      for (
        let y = blockHeight, iteration_y = 0;
        y <= verticalHeight - blockHeight * 2, iteration_y < 18;
        y += blockHeight, iteration_y++
      ) {
        let initialAngle =
          distance(x + halfBlock, y + halfBlock, centreX, centreY) / 4;
        initialAngle = Number((Math.round(initialAngle * 2) / 2).toFixed(2));
        blocks.push(
          new RotatingBlock(
            p5,
            "#00000000",
            "#FFFFFF",
            x,
            y,
            blockWidth,
            initialAngle,
            0.5,
          ),
        );
      }
    }
  };
  p5.draw = () => {
    p5.background(backGroundColour);
    blocks.forEach((block) => {
      block.draw();
    });
  };
});
