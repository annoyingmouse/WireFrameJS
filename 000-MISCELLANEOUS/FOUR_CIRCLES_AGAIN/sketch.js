import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";
import { ThreeQuartersCircle } from "./ThreeQuartersCircle.js";

new p5((p5) => {
  const circles = [];
  const main = document.querySelector("main");
  const verticalHeight = main.clientWidth;
  const orbitSpeed = 0.2;
  const halfVerticalHeight = verticalHeight / 2;
  // Orbiting swings each circle's center from its diagonal quadrant spot to
  // an axis-aligned spot at the same distance from the canvas center, and
  // the axis-aligned spot sits closer to the canvas edge. Shrinking the
  // whole quadrant layout (position offset and circle size together) by
  // this factor keeps adjacent circles exactly tangent at rest while making
  // them exactly tangent to the canvas edge at the axis-aligned extreme,
  // instead of overflowing it.
  const orbitScaleFactor = 2 * (Math.SQRT2 - 1);
  const quadrantOffset = (halfVerticalHeight / 2) * orbitScaleFactor;
  const circleDiameter = halfVerticalHeight * orbitScaleFactor;
  const orbitRadius = quadrantOffset * Math.SQRT2;

  p5.setup = () => {
    const canvas = p5.createCanvas(verticalHeight, verticalHeight);
    canvas.style("display", "block");
    canvas.style("outline", "1px solid #000");
    p5.pixelDensity(1);
    p5.colorMode(p5.RGB);
    p5.angleMode(p5.DEGREES);
    circles.push(
      new ThreeQuartersCircle(p5, {
        diameter: circleDiameter,
        colour: "#000000",
        notchAngle: 90,
        orbitCenterX: halfVerticalHeight,
        orbitCenterY: halfVerticalHeight,
        orbitRadius,
        orbitAngle: -135,
        orbitSpeed,
      }),
      new ThreeQuartersCircle(p5, {
        diameter: circleDiameter,
        colour: "#000000",
        notchAngle: 180,
        orbitCenterX: halfVerticalHeight,
        orbitCenterY: halfVerticalHeight,
        orbitRadius,
        orbitAngle: -45,
        orbitSpeed,
      }),
      new ThreeQuartersCircle(p5, {
        diameter: circleDiameter,
        colour: "#000000",
        notchAngle: 0,
        orbitCenterX: halfVerticalHeight,
        orbitCenterY: halfVerticalHeight,
        orbitRadius,
        orbitAngle: 135,
        orbitSpeed,
      }),
      new ThreeQuartersCircle(p5, {
        diameter: circleDiameter,
        colour: "#000000",
        notchAngle: 270,
        orbitCenterX: halfVerticalHeight,
        orbitCenterY: halfVerticalHeight,
        orbitRadius,
        orbitAngle: 45,
        orbitSpeed,
      }),
    );
  };
  p5.draw = () => {
    p5.background(255);
    circles.forEach((circle) => {
      circle.draw();
    });
  };
});
