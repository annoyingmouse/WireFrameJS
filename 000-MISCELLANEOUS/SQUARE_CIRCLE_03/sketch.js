import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";
import { SquareCircle } from "./square_circle.js";

const hexToRGB = (hex) =>
  hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => "#" + r + r + g + g + b + b,
    )
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16));
const mixColour = (c1, c2, pc) =>
  RGBToHex(
    Math.round(mix(c1[0], c2[0], pc)),
    Math.round(mix(c1[1], c2[1], pc)),
    Math.round(mix(c1[2], c2[2], pc)),
  );
const mix = (s, e, pc) => s + pc * (e - s);
const RGBToHex = (r, g, b) =>
  `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;

new p5((p5) => {
  const main = document.querySelector("main");
  const verticalHeight = main.clientWidth;
  const backGroundColour = "#000000";
  let square_circles = [];

  p5.setup = () => {
    p5.angleMode(p5.DEGREES);
    p5.createCanvas(verticalHeight, verticalHeight);
    p5.background(backGroundColour);
    p5.frameRate(30);
    p5.drawingContext.shadowOffsetX = 5;
    p5.drawingContext.shadowOffsetY = 5;
    p5.drawingContext.shadowBlur = 20;
    p5.drawingContext.shadowColor = "#230304";
    for (let i = 0; i < 13; i++) {
      let colour;
      if (i / 13 < 0.5) {
        colour = mixColour(hexToRGB("#230304"), hexToRGB("#ff3455"), i / 6);
      } else {
        colour = mixColour(
          hexToRGB("#ff3455"),
          hexToRGB("#ffffff"),
          (i - 6) / 7,
        );
      }
      square_circles.push(
        new SquareCircle(
          p5,
          colour,
          verticalHeight,
          verticalHeight * (0.75 - i * 0.055),
          i * 5,
        ),
      );
    }
  };
  p5.draw = () => {
    p5.background(backGroundColour);
    square_circles.forEach((square_circle) => {
      square_circle.draw();
    });
  };
});
