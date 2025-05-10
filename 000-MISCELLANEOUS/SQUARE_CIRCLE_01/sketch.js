import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";
import { SquareCircle } from "./square_circle.js";

new p5((p5) => {
  const main = document.querySelector("main");
  const verticalHeight = main.clientWidth;
  const backGroundColour = "#000000";
  let square_circles = [];

  p5.setup = () => {
    p5.angleMode(p5.DEGREES);
    p5.createCanvas(verticalHeight, verticalHeight);
    p5.background(backGroundColour);
    square_circles.push(
      new SquareCircle(p5, "#161616", verticalHeight, verticalHeight * 0.75, 0),
      new SquareCircle(p5, "#242424", verticalHeight, verticalHeight * 0.7, 5),
      new SquareCircle(
        p5,
        "#333333",
        verticalHeight,
        verticalHeight * 0.65,
        10,
      ),
      new SquareCircle(p5, "#434343", verticalHeight, verticalHeight * 0.6, 15),
      new SquareCircle(
        p5,
        "#545454",
        verticalHeight,
        verticalHeight * 0.55,
        20,
      ),
      new SquareCircle(p5, "#656565", verticalHeight, verticalHeight * 0.5, 25),
      new SquareCircle(
        p5,
        "#777777",
        verticalHeight,
        verticalHeight * 0.45,
        30,
      ),
      new SquareCircle(p5, "#898989", verticalHeight, verticalHeight * 0.4, 35),
      new SquareCircle(
        p5,
        "#9c9c9c",
        verticalHeight,
        verticalHeight * 0.35,
        40,
      ),
      new SquareCircle(p5, "#afafaf", verticalHeight, verticalHeight * 0.3, 45),
      new SquareCircle(
        p5,
        "#c2c2c2",
        verticalHeight,
        verticalHeight * 0.25,
        50,
      ),
      new SquareCircle(p5, "#d6d6d6", verticalHeight, verticalHeight * 0.2, 55),
      new SquareCircle(
        p5,
        "#eaeaea",
        verticalHeight,
        verticalHeight * 0.15,
        60,
      ),
      new SquareCircle(p5, "#ffffff", verticalHeight, verticalHeight * 0.1, 65),
    );
  };
  p5.draw = () => {
    p5.background(backGroundColour);
    square_circles.forEach((square_circle) => {
      square_circle.draw();
    });
  };
});
