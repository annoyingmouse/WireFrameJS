import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";
import { Disk } from "./Disk.js";

new p5((p5) => {
  const disks = [];
  const main = document.querySelector("main");
  const verticalHeight = main.clientWidth;

  const reset = () => {
    disks.forEach((disk) => {
      disk.startAngle = 0;
    });
  };

  p5.setup = () => {
    const canvas = p5.createCanvas(verticalHeight, verticalHeight);
    canvas.style("display", "block");
    canvas.style("outline", "1px solid #FFFFFF");
    p5.pixelDensity(1);
    p5.colorMode(p5.RGB);
    p5.angleMode(p5.DEGREES);
    disks.push(
      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight * 1.6,
        0,
        "#FFFFFF",
        "#000000",
        360 / 256,
        512,
      ),
      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight * 1.4,
        0,
        "#FFFFFF",
        "#000000",
        360 / 128,
        256,
      ),
      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight * 1.2,
        0,
        "#FFFFFF",
        "#000000",
        360 / 64,
        128,
      ),
      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight,
        0,
        "#FFFFFF",
        "#000000",
        360 / 32,
        64,
      ),
      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight * 0.8,
        0,
        "#FFFFFF",
        "#000000",
        360 / 16,
        32,
      ),
      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight * 0.6,
        0,
        "#FFFFFF",
        "#000000",
        360 / 8,
        16,
      ),
      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight * 0.4,
        0,
        "#FFFFFF",
        "#000000",
        360 / 4,
        8,
      ),
      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight * 0.2,
        0,
        "#FFFFFF",
        "#000000",
        360 / 2,
        4,
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
