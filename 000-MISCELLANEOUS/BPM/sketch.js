import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";
import { DSEG14 } from "./DSEG14.js";

new p5((p5) => {
  let glyph;
  let counter = 0;
  const increment = () => {
    counter++;
    if (counter >= 64) {
      counter = 0;
    }
    console.info(characters[counter]);
    glyph.setState(characters[counter]);
  };
  const characters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    " ",
    "?",
    '"',
    "$",
    "%",
    "&",
    "'",
    "(",
    ")",
    "*",
    "+",
    ",",
    "-",
    "/",
    "<",
    "=",
    ">",
    "@",
    "\\",
    "^",
    "_",
    "`",
    "|",
    "~",
    "¥",
    "¦",
    "°",
    "±",
  ];
  p5.setup = () => {
    const canvas = p5.createCanvas(1144, 1640);
    canvas.style("display", "block");
    canvas.style("outline", "none");
    canvas.style("background", "transparent");
    console.info(characters[counter]);
    glyph = new DSEG14(p5, 0, 0, 0.1, null, null, characters[counter]);
    setInterval(increment, 1000);
  };

  p5.draw = () => {
    p5.background("rgba(0, 255, 0, 0)");
    glyph.draw();
  };
});
