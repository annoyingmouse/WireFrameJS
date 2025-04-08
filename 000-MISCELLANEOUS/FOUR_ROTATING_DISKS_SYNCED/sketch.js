import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";
import { Disk } from "./Disk.js";

new p5((p5) => {
  const disks = [];
  const main = document.querySelector("main");
  const verticalHeight = main.clientWidth;

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
        verticalHeight * 0.9,
        0,
        "#FFFFFF",
        "#000000",
        360 / 256,
        512,
        false,
        true
      ),
      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight * 0.8,
        0,
        "#FFFFFF",
        "#000000",
        360 / 128,
        256,
        false,
        false
      ),
      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight * 0.7,
        0,
        "#FFFFFF",
        "#000000",
        360 / 64,
        128,
        false,
        false
      ),
      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight * 0.6,
        0,
        "#FFFFFF",
        "#000000",
        360 / 32,
        64,
        false,
        false
      ),
      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight * 0.5,
        0,
        "#FFFFFF",
        "#000000",
        360 / 16,
        32,
        false,
        false
      ),
      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight * 0.4,
        0,
        "#FFFFFF",
        "#000000",
        360 / 8,
        16,
        false,
        false
      ),

      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight * 0.3,
        0,
        "#FFFFFF",
        "#000000",
        360 / 4,
        8,
        false,
        false
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
        false,
        false
      ),
    );
  };
  p5.draw = () => {
    p5.background("#FFFFFF");
    p5.noStroke();
    disks.forEach((disk, index) => {
      disk.draw();
      if(disk.done) {
        disk.done = false
        const target = disks[(index + 1) % disks.length];
        target.done = false
        target.animating = true;
        target.startAngle = 0;
      }
    });
  };
});
