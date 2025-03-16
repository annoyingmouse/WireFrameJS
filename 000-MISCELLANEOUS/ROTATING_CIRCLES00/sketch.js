import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";
import { CircleWithRotatingDot } from "./CircleWithRotatingDot.js";

new p5((p5) => {
  const main = document.querySelector("main");
  const verticalHeight = main.clientWidth;
  const backGroundColour = "#FFFFFFFF";
  const numberOfCircles = 30;
  const blockWidth = verticalHeight / numberOfCircles;
  const blockHeight = blockWidth;
  let spheres = [];

  p5.setup = () => {
    p5.angleMode(p5.DEGREES);
    p5.createCanvas(verticalHeight, verticalHeight);
    p5.background(backGroundColour);
    for (let x = 0; x < numberOfCircles; x++) {
      for (let y = 0; y < numberOfCircles; y++) {
        spheres.push(
          new CircleWithRotatingDot(
            p5,
            x * blockWidth + blockWidth / 2,
            y * blockHeight + blockHeight / 2,
            blockWidth / 2,
            5,
            x * (360 / numberOfCircles) + y * (360 / numberOfCircles),
          ),
        );
      }
    }
  };
  p5.draw = () => {
    p5.background(backGroundColour);
    spheres.forEach((sphere) => {
      sphere.draw();
    });
  };
});
