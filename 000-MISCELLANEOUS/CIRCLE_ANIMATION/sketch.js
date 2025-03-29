import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";

new p5((p5) => {
  const main = document.querySelector("main");
  const verticalHeight = main.clientWidth;

  p5.setup = () => {
    const canvas = p5.createCanvas(verticalHeight, verticalHeight);
    canvas.style("display", "block");
    canvas.style("outline", "1px solid #000");
  };

  p5.draw = () => {
    p5.background(255);
    p5.fill(0);
    p5.noStroke();
    p5.circle(p5.width / 2, p5.height / 2, 100);
    p5.fill(255);
    p5.circle(p5.width / 2, p5.height / 2, 50);
  };
});
