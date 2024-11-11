/*global p5*/

import Snake from "./modules/Snake.js";

new p5((p5) => {
	let snake;
	let food;
	const scale = 20;

	const pickLocation = (p5) => {
		const cols = p5.floor(p5.width / scale);
		const rows = p5.floor(p5.height / scale);
		food = p5.createVector(
			p5.floor(p5.random(cols)),
			p5.floor(p5.random(rows)),
		);
		food.mult(scale);
	};

	p5.setup = () => {
		p5.createCanvas(600, 600);
		p5.frameRate(10);
		snake = new Snake(scale);
		pickLocation(p5);
	};

	p5.draw = () => {
		p5.background(50, 50, 100);
		if (snake.eat(food, p5)) {
			pickLocation(p5);
		}
		snake.death(p5);
		snake.update(p5);
		snake.show(p5);
		p5.fill(255, 0, 100);
		p5.rect(food.x, food.y, scale, scale);
	};

	p5.keyPressed = (p5) => {
		const directions = {
			37: (snake) => snake.dir(-1, 0), // LEFT
			38: (snake) => snake.dir(0, -1), // UP
			39: (snake) => snake.dir(1, 0), // RIGHT
			40: (snake) => snake.dir(0, 1), // DOWN
		};
		directions[p5.keyCode] && directions[p5.keyCode](snake);
	};
});
