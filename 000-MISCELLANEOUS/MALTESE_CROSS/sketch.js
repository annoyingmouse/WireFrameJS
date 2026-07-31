import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";
import { RotatingCross } from "./RotatingCross.js";
const distance = (x1, y1, x2, y2) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
};

new p5((p5) => {
  const main = document.querySelector("main");
  const verticalHeight = main.clientWidth;
  const backGroundColour = "#FFFFFF";
  const blockWidth = Math.floor(verticalHeight / 12);
  let blocks = [];
  let blackReferenceBlock = null;
  const distances = [];

  p5.setup = () => {
    p5.angleMode(p5.DEGREES);
    p5.createCanvas(verticalHeight, verticalHeight);
    p5.background(backGroundColour);
    p5.frameRate(60);

    const t = blockWidth / 3;
    const halfWidth = blockWidth / 2;
    const corners = [
      [0, 0],
      [verticalHeight, 0],
      [0, verticalHeight],
      [verticalHeight, verticalHeight],
    ];
    let mMin = Infinity, mMax = -Infinity, nMin = Infinity, nMax = -Infinity;
    corners.forEach(([x, y]) => {
      const m = (x + 2 * y) / (5 * t);
      const n = (2 * x - y) / (5 * t);
      mMin = Math.min(mMin, m);
      mMax = Math.max(mMax, m);
      nMin = Math.min(nMin, n);
      nMax = Math.max(nMax, n);
    });
    const pad = 3;
    mMin = Math.floor(mMin) - pad;
    mMax = Math.ceil(mMax) + pad;
    nMin = Math.floor(nMin) - pad;
    nMax = Math.ceil(nMax) + pad;

    const tiles = [];
    for (let m = mMin; m <= mMax; m++) {
      for (let n = nMin; n <= nMax; n++) {
        const cx = t * (m + 2 * n);
        const cy = t * (2 * m - n);
        const isWhite = Math.abs(m + n) % 2 === 1;
        tiles.push({ cx, cy, isWhite });
      }
    }

    const velocity = 0.5;
    const delay = 90 / velocity; // one 90deg leg
    const restDelay = delay; // idle time between rotations
    tiles.forEach(({ cx, cy, isWhite }) => {
      const fillColour = isWhite ? "#FFFFFF" : "#000000";
      const block = new RotatingCross(
        p5,
        fillColour,
        cx - halfWidth,
        cy - halfWidth,
        blockWidth,
        isWhite ? 90 : 0,
        velocity,
        isWhite ? delay : 0,
        delay,
        !isWhite,
        0,
        restDelay
      );
      blocks.push(block);
      if (!isWhite && blackReferenceBlock === null) {
        blackReferenceBlock = block;
      }
    });
  };
  p5.draw = () => {
    const blackActive = blackReferenceBlock.isActive;
    p5.background(blackActive ? "#FFFFFF" : "#000000");
    const resting = blocks.filter((block) => !block.isActive);
    const active = blocks.filter((block) => block.isActive);
    resting.forEach((block) => {
      block.draw();
    });
    active.forEach((block) => {
      block.draw();
    });
  };
});
