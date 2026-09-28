// LCD-mode entry point: renders the same HEDGECLOCK composition as sketch.js,
// uniformly scaled and letterboxed into the physical display's 480x320
// landscape canvas, with sound disabled, and forwards frames to the local
// Python bridge instead of (or as well as) being viewed directly.
import { sketch } from "https://cdn.skypack.dev/p5js-wrapper";
import { drawNumeral } from "./numeral.js";
import { getTimeArray } from "./utilities.js";
import { createLcdBridge } from "./lcd-bridge.js";
import { setAudioEnabled } from "./audio-gate.js";

// Must run before p5's preload/draw lifecycle starts, so the rustle sounds
// are never even loaded in LCD mode.
setAudioEnabled(false);

const SOURCE_WIDTH = 416;
const SOURCE_HEIGHT = 160;
const LCD_WIDTH = 480;
const LCD_HEIGHT = 320;
const SCALE = LCD_WIDTH / SOURCE_WIDTH;
const Y_OFFSET = (LCD_HEIGHT - SOURCE_HEIGHT * SCALE) / 2;

const bridge = createLcdBridge({
  endpoint: window.location.origin,
  width: LCD_WIDTH,
  height: LCD_HEIGHT,
  updateInterval: 250,
});

let numbers = getTimeArray();
let canvasElement;

sketch.setup = function () {
  const cnv = createCanvas(LCD_WIDTH, LCD_HEIGHT);
  canvasElement = cnv.canvas;
  frameRate(1);
};

sketch.draw = function () {
  const tempNumbers = getTimeArray();

  background(112, 169, 49);
  push();
  translate(0, Y_OFFSET);
  scale(SCALE);
  noStroke();
  drawNumeral(tempNumbers[0], 16, 16, tempNumbers[0] !== numbers[0]);
  drawNumeral(tempNumbers[1], 64, 16, tempNumbers[1] !== numbers[1]);
  drawNumeral(":", 112, 16);
  drawNumeral(tempNumbers[2], 160, 16, tempNumbers[2] !== numbers[2]);
  drawNumeral(tempNumbers[3], 208, 16, tempNumbers[3] !== numbers[3]);
  drawNumeral(":", 257, 16);
  drawNumeral(tempNumbers[4], 304, 16, tempNumbers[4] !== numbers[4]);
  drawNumeral(tempNumbers[5], 352, 16, tempNumbers[5] !== numbers[5]);
  pop();
  numbers = [...tempNumbers];

  bridge.submitCanvas(canvasElement);
};
