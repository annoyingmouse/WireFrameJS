import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";
import { LineWithCircle } from "./LineWithCircle.js";

new p5((p5) => {
  const LinesWithCircles = [];
  const main = document.querySelector("main");
  const verticalHeight = main.clientWidth;
  const segments = 16;
  const dotsize = 40;

  p5.setup = () => {
    const canvas = p5.createCanvas(verticalHeight, verticalHeight);
    canvas.style("display", "block");
    canvas.style("outline", "0");
    p5.colorMode(p5.RGB);
    p5.angleMode(p5.DEGREES);
    for (let i = 0; i < segments; i++) {
      const angle = (180 / segments) * i;
      const radius = verticalHeight / 2 - dotsize;
      const centerX = verticalHeight / 2;
      const centerY = verticalHeight / 2;
      LinesWithCircles.push(
        new LineWithCircle(
          p5,
          centerX,
          centerY,
          radius,
          angle,
          segments,
          i,
          dotsize,
          "#000000",
          0.25,
          "#000000",
        ),
      );
    }
  };
  p5.draw = () => {
    p5.background("#FFFFFF");
    p5.noStroke();
    LinesWithCircles.forEach((l) => l.draw());
  };
});
