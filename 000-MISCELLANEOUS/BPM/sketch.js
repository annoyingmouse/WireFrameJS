import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";
import { DSEG14 } from "./DSEG14.js";
import { getTimeArray } from "./utilities.js";

new p5((p5) => {
  const numerals = [];

  p5.setup = () => {
    const canvas = p5.createCanvas(1144, 500);
    const tempNumbers = getTimeArray();
    numerals.push(
      new DSEG14(p5, 100, 150, 0.1, "#000000", null, tempNumbers[0]),
    );
    numerals.push(
      new DSEG14(p5, 230, 150, 0.1, "#000000", null, tempNumbers[1]),
    );
    numerals.push(
      new DSEG14(p5, 410, 150, 0.1, "#000000", null, tempNumbers[2]),
    );
    numerals.push(
      new DSEG14(p5, 550, 150, 0.1, "#000000", null, tempNumbers[3]),
    );
    numerals.push(
      new DSEG14(p5, 740, 150, 0.1, "#000000", null, tempNumbers[4]),
    );
    numerals.push(
      new DSEG14(p5, 870, 150, 0.1, "#000000", null, tempNumbers[5]),
    );
  };

  p5.draw = () => {
    p5.background("rgba(0, 0, 0, 0)");
    const tempNumbers = getTimeArray();
    for (let i = 0; i < 6; i++) {
      numerals[i].setState(tempNumbers[i]);
      numerals[i].draw();
    }
  };
});
