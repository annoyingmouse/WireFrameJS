import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";
import { Disk } from "./Disk.js";

new p5((p5) => {
  const disks = [];
  const main = document.querySelector("main");
  const verticalHeight = main.clientWidth;

  const reset = () => {
    disks.forEach((disk) => {
      disk.startAngle = 0;
      if (disk.firstPhase) {
        disk.translateTo = disk.translateBackTo;
        disk.increment = (disk.translateBackTo - disk.startAngle) / 100;
        disk.firstPhase = false;
      } else {
        disk.translateTo = disk.originalTranslateTo;
        disk.increment = (disk.originalTranslateTo - disk.startAngle) / 100;
        disk.firstPhase = true;
      }
    });
  };

  p5.setup = () => {
    const canvas = p5.createCanvas(verticalHeight, verticalHeight);
    canvas.style("display", "block");
    canvas.style("outline", "1px solid #000");
    p5.colorMode(p5.RGB);
    p5.angleMode(p5.DEGREES);
    disks.push(
      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight,
        0,
        verticalHeight / 10,
        "#000000",
        "#FFFFFF",
        (360 / 16) * 7,
        0,
      ),
      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight * 0.9,
        0,
        verticalHeight / 10,
        "#FFFFFF",
        "#000000",
        (360 / 16) * 6,
        360 / 16,
      ),
      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight * 0.8,
        0,
        verticalHeight / 10,
        "#000000",
        "#FFFFFF",
        (360 / 16) * 5,
        (360 / 16) * 2,
      ),
      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight * 0.7,
        0,
        verticalHeight / 10,
        "#FFFFFF",
        "#000000",
        (360 / 16) * 4,
        (360 / 16) * 3,
      ),
      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight * 0.6,
        0,
        verticalHeight / 10,
        "#000000",
        "#FFFFFF",
        (360 / 16) * 3,
        (360 / 16) * 4,
      ),
      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight * 0.5,
        0,
        verticalHeight / 10,
        "#FFFFFF",
        "#000000",
        (360 / 16) * 2,
        (360 / 16) * 5,
      ),
      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight * 0.4,
        0,
        verticalHeight / 10,
        "#000000",
        "#FFFFFF",
        (360 / 16) * 1,
        (360 / 16) * 6,
      ),
      new Disk(
        p5,
        verticalHeight / 2,
        verticalHeight / 2,
        verticalHeight * 0.3,
        0,
        verticalHeight / 10,
        "#FFFFFF",
        "#000000",
        0,
        (360 / 16) * 7,
      ),
    );
    setInterval(reset, 2000);
  };
  p5.draw = () => {
    p5.background("#FFFFFF");
    p5.noStroke();
    disks.forEach((disk) => {
      disk.draw();
    });
  };
});
