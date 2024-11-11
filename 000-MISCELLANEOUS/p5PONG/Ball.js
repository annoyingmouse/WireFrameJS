"use strict";
class Ball {
	constructor(x, y) {
		this.r = 12;
		this.reset();
	}

	checkPaddle(p, left) {
		const conditionOne = this.y - this.r < p.y + p.height / 2;
		const conditionTwo = this.y + this.r > p.y - p.height / 2;
		const conditionThree = left
			? this.x - this.r < p.x + p.width / 2
			: this.x + this.r > p.x - p.width / 2;
		const rad = left ? Math.radians(45) : Math.radians(135);
		const diff = this.y - (p.y - p.height / 2);
		const angle = map(diff, 0, p.height, -rad, rad);
		if (conditionOne && conditionTwo && conditionThree) {
			this.xSpeed = 5 * cos(angle);
			this.ySpeed = 5 * sin(angle);
			if (left) {
				if (this.x > p.x - p.width / 2) {
					this.x = p.x + p.width / 2 + this.r;
				}
			} else {
				if (this.x < p.x) {
					this.x = p.x - p.width / 2 - this.r;
				}
			}
		}
	}

	show() {
		noStroke();
		fill(255);
		ellipse(this.x, this.y, this.r * 2, this.r * 2);
	}

	update() {
		this.x += this.xSpeed;
		this.y += this.ySpeed;
	}

	edges() {
		if (this.y < 0 || this.y > height) {
			this.ySpeed *= -1;
		}

		if (this.x - this.r > width) {
			leftscore++;
			this.reset();
		}

		if (this.x + this.r < 0) {
			rightscore++;
			this.reset();
		}
	}

	reset() {
		this.x = width / 2;
		this.y = height / 2;
		const angle = random(-PI / 4, PI / 4);
		this.xSpeed = 5 * Math.cos(angle);
		this.ySpeed = 5 * Math.sin(angle);
		if (random(1) < 0.5) {
			this.xSpeed *= -1;
		}
	}
}
