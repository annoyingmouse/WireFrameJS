import Pendulum from "./Pendulum.js";

/*
 * https://editor.p5js.org/zygugi/sketches/SkGvzmnyf
 */

new p5((p5) => {
	const pendula = [];

	p5.setup = () => {
		p5.createCanvas(640, 360);
		for (let i = 250; i < 300; i += 5) {
			pendula.push(new Pendulum(p5, p5.createVector(p5.width / 2, 0), i));
		}
	};

	p5.draw = () => {
		p5.background(51);
		pendula.forEach((p) => p.update());
	};
});
