import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";
import { Disk } from "./Disk.js";

new p5((p5) => {
  const disks = [];
  const main = document.querySelector("main");
  const verticalHeight = main.clientWidth;

  const reset = () => {
    disks.forEach((disk) => {
      disk.startAngle = 360 / 32;
    });
  };

  p5.setup = () => {
    const canvas = p5.createCanvas(verticalHeight, verticalHeight);
    canvas.style("display", "block");
    canvas.style("outline", "1px solid #000");
    p5.pixelDensity(1);
    p5.colorMode(p5.RGB);
    p5.angleMode(p5.DEGREES);
    disks.push(
      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight,
        360 / 32,
        "#FFFFFF",
        "#000000",
        (360 / 32) * 5,
      ),
      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight * 0.9,
        360 / 32,
        "#FFFFFF",
        "#000000",
        (360 / 32) * 9,
      ),
      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight * 0.8,
        360 / 32,
        "#FFFFFF",
        "#000000",
        (360 / 32) * 13,
      ),
      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight * 0.7,
        360 / 32,
        "#FFFFFF",
        "#000000",
        (360 / 32) * 17,
      ),
      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight * 0.6,
        360 / 32,
        "#FFFFFF",
        "#000000",
        (360 / 32) * 21,
      ),
      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight * 0.5,
        360 / 32,
        "#FFFFFF",
        "#000000",
        (360 / 32) * 25,
      ),
      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight * 0.4,
        360 / 32,
        "#FFFFFF",
        "#000000",
        (360 / 32) * 29,
      ),
      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight * 0.3,
        360 / 32,
        "#FFFFFF",
        "#000000",
        (360 / 32) * 33,
      ),
      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight * 0.2,
        360 / 32,
        "#FFFFFF",
        "#000000",
        (360 / 32) * 37,
      ),
      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight * 0.1,
        360 / 32,
        "#FFFFFF",
        "#000000",
        (360 / 32) * 41,
      ),
    );
    setInterval(reset, 5000);
  };
  p5.draw = () => {
    p5.background(0);
    p5.noStroke();
    disks.forEach((disk) => {
      disk.draw();
    });
  };
});
