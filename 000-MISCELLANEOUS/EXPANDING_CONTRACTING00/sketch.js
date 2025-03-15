import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";
import { ExpandingContractingDotRing } from "./ExpandingContractingDotRing.js";

new p5((p5) => {
  const main = document.querySelector("main");
  const verticalHeight = main.clientWidth;
  const backGroundColour = "#F9B92F";
  const initialDotWidth = Math.floor(verticalHeight / 30);
  const ringNumber = 14;
  const incrementer = (initialDotWidth * 2) / ringNumber;
  let dotCircles = [];

  p5.setup = () => {
    p5.angleMode(p5.DEGREES);
    p5.createCanvas(verticalHeight, verticalHeight);
    p5.background(backGroundColour);
    p5.fill(0);
    p5.noStroke();
    // p5.frameRate(15);

    let dotWidth = -initialDotWidth;
    for (let dots = 1; dots <= ringNumber; dots++) {
      dotCircles.push(
        new ExpandingContractingDotRing(
          p5,
          0,
          p5.width / 2,
          p5.height / 2,
          initialDotWidth,
          dotWidth,
          dots * 6,
        ),
      );
      dotWidth += incrementer;
    }
  };
  p5.draw = () => {
    p5.background(backGroundColour);
    p5.fill(0);
    p5.noStroke();
    dotCircles.forEach((dotCircle, index) => {
      if (Math.round(dotCircle.dotWidth) >= dotCircle.initialDotWidth) {
        dotCircle.growing = false;
      }
      if (Math.round(dotCircle.dotWidth) <= -dotCircle.initialDotWidth) {
        dotCircle.growing = true;
      }
      if (dotCircle.growing) {
        dotCircle.dotWidth += 0.25;
      } else {
        dotCircle.dotWidth -= 0.25;
      }
      dotCircle.draw();
    });
  };
});
