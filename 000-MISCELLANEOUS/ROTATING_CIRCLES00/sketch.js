import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";
import {RotatingSphere} from "./RotatingSphere.js";

new p5((p5) => {
  const main = document.querySelector("main");
  const verticalHeight = main.clientWidth;
  const backGroundColour = "#FFFFFFFF";
  const blockWidth = Math.floor(verticalHeight / 11);
  const blockHeight = blockWidth;
  let spheres = [];

  p5.setup = () => {
    p5.angleMode(p5.DEGREES);
    p5.createCanvas(verticalHeight, verticalHeight);
    p5.background(backGroundColour);
    for (let x = 0; x < 11; x++) {
      for (let y = 0; y < 11; y++) {
        spheres.push(
          new RotatingSphere(
            p5,
            x * blockWidth + blockWidth / 2,
            y * blockHeight + blockHeight / 2,
            blockWidth / 2,
            5,
            x * 36 + y * 36,
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
