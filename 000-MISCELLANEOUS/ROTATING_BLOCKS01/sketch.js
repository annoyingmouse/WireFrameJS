import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";
import { RotatingBlock } from "./RotatingBlock.js";

new p5((p5) => {
  const main = document.querySelector("main");
  const verticalHeight = main.clientWidth;
  const backGroundColour = "#000000";
  const blockWidth = Math.floor(verticalHeight / 20);
  const blockHeight = blockWidth;
  let blocks = [];
  const increment = 2;

  p5.setup = () => {
    p5.angleMode(p5.DEGREES);
    p5.createCanvas(verticalHeight, verticalHeight);
    p5.background(backGroundColour);
    let angle_x = 0;
    let angle_y = 0;
    for (
      let x = blockWidth, iteration_x = 0;
      x <= verticalHeight - blockWidth * 2, iteration_x < 18;
      x += blockWidth, iteration_x++
    ) {
      if (iteration_x >= 4 && iteration_x < 9) {
        angle_x -= increment;
      } else if (iteration_x >= 10 && iteration_x < 14) {
        angle_x += increment;
      } else if (iteration_x >= 14 || iteration_x < 4) {
        angle_x = 0;
      }
      console.log("x", iteration_x, angle_x);
      for (
        let y = blockHeight, iteration_y = 0;
        y <= verticalHeight - blockHeight * 2, iteration_y < 18;
        y += blockHeight, iteration_y++
      ) {
        if (iteration_y >= 4 && iteration_y < 9) {
          angle_y -= increment;
        } else if (iteration_y >= 10 && iteration_y < 14) {
          angle_y += increment;
        } else if (iteration_y >= 14 || iteration_y < 4) {
          angle_y = 0;
        }
        console.log("y", iteration_y, angle_y);
        blocks.push(
          new RotatingBlock(
            p5,
            "#00000000",
            "#FFFFFF",
            x,
            y,
            blockWidth,
            !angle_x || !angle_y ? 0 : angle_x + angle_y,
            0.5,
          ),
        );
      }
    }
    // p5.frameRate(1);
  };
  p5.draw = () => {
    p5.background(backGroundColour);
    blocks.forEach((block) => {
      block.draw();
    });
  };
});
