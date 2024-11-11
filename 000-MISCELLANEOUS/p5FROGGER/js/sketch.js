/*global p5*/

import Frog from "./modules/Frog.js";
import Lane from "./modules/Lane.js";
import Safety from "./modules/Safety.js";

new p5((p5) => {
	let frog;
	const lanes = [];
	const grid = 50;
	const LOGS = ["#926239", "#49311c", "#614126", "#7a5230"];
	const COLOURS = {
		BUS: "#930b31",
		DHL: "#ffcc00",
		TESCO: "#00539f",
		MINI: "#004225",
	};

	p5.resetGame = () => {
		frog = new Frog(p5.width / 2 - grid / 2, p5.height - grid, grid, p5.width);
		frog.attach(null);
	};

	p5.setup = () => {
		p5.createCanvas(550, 550);
		p5.resetGame();
		lanes.push(new Safety(0, grid, p5.width));
		lanes.push(new Lane(1, grid, LOGS[0], "LOG", 1, 3, 150, 3, p5.width));
		lanes.push(new Lane(2, grid, LOGS[1], "LOG", 2, 3, 350, -2.5, p5.width));
		lanes.push(new Lane(3, grid, LOGS[2], "LOG", 4, 1, 150, 1, p5.width));
		lanes.push(new Lane(4, grid, LOGS[3], "LOG", 3, 2, 250, -1.7, p5.width));
		lanes.push(new Safety(5, grid, p5.width));
		lanes.push(
			new Lane(6, grid, COLOURS.MINI, "CAR", 3, 1, 150, 2.4, p5.width),
		);
		lanes.push(
			new Lane(7, grid, COLOURS.TESCO, "CAR", 2, 2, 150, -3.6, p5.width),
		);
		lanes.push(new Lane(8, grid, COLOURS.DHL, "CAR", 1, 3, 150, 2.3, p5.width));
		lanes.push(new Lane(9, grid, COLOURS.BUS, "CAR", 1, 4, 150, -1, p5.width));
		lanes.push(new Safety(10, grid, p5.width));
	};

	p5.draw = () => {
		p5.background(0);
		lanes.forEach((lane) => lane.run(p5));
		const laneIndex = parseInt(frog.y / grid, 10);
		if (lanes[laneIndex] && lanes[laneIndex].type !== "SAFETY") {
			lanes[laneIndex].check(frog, p5);
		}
		p5.fill(255, 100);
		frog.update(p5);
		frog.show(p5);
	};

	p5.keyPressed = (p5) => {
		const directions = {
			37: (frog) => frog.move(-1, 0), // LEFT
			38: (frog) => frog.move(0, -1), // UP
			39: (frog) => frog.move(1, 0), // RIGHT
			40: (frog) => frog.move(0, 1), // DOWN
		};
		directions[p5.keyCode] && directions[p5.keyCode](frog);
	};
});
