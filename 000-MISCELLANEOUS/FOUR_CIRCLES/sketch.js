import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";
import { ThreeQuartersCircle } from "./ThreeQuartersCircle.js";

new p5((p5) => {
  const circles = [];
  const main = document.querySelector("main");
  const verticalHeight = main.clientWidth;
  const speed = 0.25;
  const thirdVerticalHeight = verticalHeight / 3;
  const radius = verticalHeight / 3.75;

  p5.setup = () => {
    const canvas = p5.createCanvas(verticalHeight, verticalHeight);
    canvas.style("display", "block");
    canvas.style("outline", "1px solid #000");
    p5.pixelDensity(1);
    p5.colorMode(p5.RGB);
    p5.angleMode(p5.DEGREES);
    console.log(verticalHeight / 3, (verticalHeight / 3) * 2);
    circles.push(
      new ThreeQuartersCircle(
        p5,
        thirdVerticalHeight,
        thirdVerticalHeight,
        radius,
        90 + 45 / 2,
        "#000000",
        45 + 45 / 2,
        speed,
      ),
      new ThreeQuartersCircle(
        p5,
        thirdVerticalHeight * 2,
        thirdVerticalHeight,
        radius,
        180 + 45 / 2,
        "#000000",
        180 - 45 / 2,
        speed,
      ),
      new ThreeQuartersCircle(
        p5,
        thirdVerticalHeight,
        thirdVerticalHeight * 2,
        radius,
        45 / 2,
        "#000000",
        -(45 / 2),
        speed,
      ),
      new ThreeQuartersCircle(
        p5,
        thirdVerticalHeight * 2,
        thirdVerticalHeight * 2,
        radius,
        270 + 45 / 2,
        "#000000",
        270 - 45 / 2,
        speed,
      ),
    );
  };
  p5.draw = () => {
    p5.background(255);
    circles.forEach((circle) => {
      circle.draw();
    });
  };
});
