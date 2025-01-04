import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";
import { DSEG14 } from "./DSEG14.js";
import { getTimeArray, characters } from "./utilities.js";

new p5((p5) => {
  let glyph1;
  let glyph2;
  let counter = 0;
  const increment = () => {
    counter++;
    if (counter >= 64) {
      counter = 0;
    }
    console.info(characters[counter]);
    glyph1.setState(characters[counter]);
  };
  const numerals = [];
  p5.setup = () => {
    const canvas = p5.createCanvas(1144, 1640);
    canvas.style("display", "block");
    canvas.style("outline", "none");
    canvas.style("background", "transparent");
    console.info(characters[counter]);
    glyph1 = new DSEG14(p5, 0, 0, 0.1, null, null, characters[counter]);
    glyph2 = new DSEG14(p5, 130, 0, 0.1, null, null, "0");
    setInterval(increment, 1000);
    numerals.push(new DSEG14(p5, 0, 200, 0.1, null, null, characters[counter]));
    numerals.push(
      new DSEG14(p5, 130, 200, 0.1, null, null, characters[counter]),
    );
    numerals.push(
      new DSEG14(p5, 260, 200, 0.1, null, null, characters[counter]),
    );
    numerals.push(
      new DSEG14(p5, 390, 200, 0.1, null, null, characters[counter]),
    );
    numerals.push(
      new DSEG14(p5, 520, 200, 0.1, null, null, characters[counter]),
    );
    numerals.push(
      new DSEG14(p5, 650, 200, 0.1, null, null, characters[counter]),
    );
  };

  p5.draw = () => {
    p5.background("rgba(0, 255, 0, 0)");
    glyph1.draw();
    glyph2.draw();

    const tempNumbers = getTimeArray();
    for (let i = 0; i < 6; i++) {
      numerals[i].setState(tempNumbers[i]);
      numerals[i].draw();
    }
  };
});
