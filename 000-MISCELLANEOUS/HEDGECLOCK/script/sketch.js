import { sketch } from "https://cdn.skypack.dev/p5js-wrapper";
import { drawNumeral } from "./numeral.js";
import { getTimeArray } from "./utilities.js";

let numbers = getTimeArray();

sketch.setup = function () {
	createCanvas(416, 160);
	frameRate(1);
};

sketch.draw = function () {
	const tempNumbers = getTimeArray();
	background(112, 169, 49);
	noStroke();
	drawNumeral(tempNumbers[0], 16, 16, tempNumbers[0] !== numbers[0]);
	drawNumeral(tempNumbers[1], 64, 16, tempNumbers[1] !== numbers[1]);
	drawNumeral(":", 112, 16);
	drawNumeral(tempNumbers[2], 160, 16, tempNumbers[2] !== numbers[2]);
	drawNumeral(tempNumbers[3], 208, 16, tempNumbers[3] !== numbers[3]);
	drawNumeral(":", 257, 16);
	drawNumeral(tempNumbers[4], 304, 16, tempNumbers[4] !== numbers[4]);
	drawNumeral(tempNumbers[5], 352, 16, tempNumbers[5] !== numbers[5]);
	numbers = [...tempNumbers];
};
