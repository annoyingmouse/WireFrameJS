import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";
import { DotCircle } from "./DotCircle.js";

new p5((p5) => {
  const main = document.querySelector("main");
  const verticalHeight = main.clientWidth;
  const backGroundColour = "#FF0000";
  const dotWidth = 20;
  let circumference = null;
  let diameter = null;
  let step = null;
  let dotCircles = [];

  p5.setup = () => {
    p5.angleMode(p5.DEGREES);
    p5.createCanvas(verticalHeight, verticalHeight);
    p5.background(backGroundColour);
    p5.fill(0);
    p5.noStroke();
    p5.circle(p5.width / 2, p5.height / 2, dotWidth);
    dotCircles.push(
      new DotCircle(p5, 0, p5.width / 2, p5.height / 2, dotWidth, 6),
    );
    dotCircles.push(
      new DotCircle(p5, 0, p5.width / 2, p5.height / 2, dotWidth, 12),
    );
    dotCircles.push(
      new DotCircle(p5, 0, p5.width / 2, p5.height / 2, dotWidth, 18),
    );
    dotCircles.push(
      new DotCircle(p5, 0, p5.width / 2, p5.height / 2, dotWidth, 24),
    );
    dotCircles.push(
      new DotCircle(p5, 0, p5.width / 2, p5.height / 2, dotWidth, 30),
    );
    dotCircles.push(
      new DotCircle(p5, 0, p5.width / 2, p5.height / 2, dotWidth, 36),
    );
    dotCircles.push(
      new DotCircle(p5, 0, p5.width / 2, p5.height / 2, dotWidth, 42),
    );
    dotCircles.push(
      new DotCircle(p5, 0, p5.width / 2, p5.height / 2, dotWidth, 48),
    );
    dotCircles.push(
      new DotCircle(p5, 0, p5.width / 2, p5.height / 2, dotWidth, 54),
    );
    dotCircles.push(
      new DotCircle(p5, 0, p5.width / 2, p5.height / 2, dotWidth, 60),
    );
    dotCircles.push(
      new DotCircle(p5, 0, p5.width / 2, p5.height / 2, dotWidth, 66),
    );
    dotCircles.push(
      new DotCircle(p5, 0, p5.width / 2, p5.height / 2, dotWidth, 72),
    );
  };
  p5.draw = () => {
    p5.background(backGroundColour);
    p5.fill(0);
    p5.noStroke();
    p5.circle(p5.width / 2, p5.height / 2, dotWidth);
    dotCircles.forEach((dotCircle, index) => {
      dotCircle.draw();
    });
  };
});
