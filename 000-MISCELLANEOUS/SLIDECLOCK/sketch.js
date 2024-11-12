import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";
import { SliderNumeral } from "./SliderNumeral.js";

new p5((p5) => {
	const verticalHeight = Math.max(
		document.documentElement.clientHeight || 0,
		window.innerHeight || 0,
	);
	const unitHeight = Math.floor(verticalHeight / 26 / 10) * 10;
	const unitWidth = unitHeight + 10;
	const Numerals = [];

	p5.setup = () => {
		p5.createCanvas(unitWidth * 17, unitHeight * 26);
		p5.background(100);
		Numerals.push(
			new SliderNumeral(p5, unitWidth / 2, 0, unitWidth, unitHeight),
		);
		Numerals.push(
			new SliderNumeral(p5, 4.5 * unitWidth, 0, unitWidth, unitHeight),
		);
		Numerals.push(
			new SliderNumeral(p5, 8.5 * unitWidth, 0, unitWidth, unitHeight),
		);
		Numerals.push(
			new SliderNumeral(p5, 12.5 * unitWidth, 0, unitWidth, unitHeight),
		);
	};
	p5.draw = () => {
		const date = new Date();
		const hour = date.getHours().toString().split("");
		const minutes = date.getMinutes().toString().split("");
		Numerals[0].update(hour.length === 1 ? 0 : Number(hour[0]));
		Numerals[1].update(hour.length === 1 ? Number(hour[0]) : Number(hour[1]));
		Numerals[2].update(minutes.length === 1 ? 0 : Number(minutes[0]));
		Numerals[3].update(
			minutes.length === 1 ? Number(minutes[0]) : Number(minutes[1]),
		);
	};
});
