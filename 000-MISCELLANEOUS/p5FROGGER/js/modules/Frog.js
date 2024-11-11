import Rectangle from "./Rectangle.js";

export default class Frog extends Rectangle {
	constructor(x, y, width) {
		super(x, y, width, width);
		this.attached = null;
	}

	attach(log) {
		this.attached = log;
	}

	update(p5) {
		if (this.attached !== null) {
			this.x += this.attached.speed;
		}
		this.x = p5.constrain(this.x, 0, p5.width - this.width);
	}

	show(p5) {
		p5.fill(0, 255, 0, 200);
		p5.rect(this.x, this.y, this.width, this.width);
	}

	move(xdir, ydir) {
		this.x += xdir * this.width;
		this.y += ydir * this.width;
		this.attached = null;
	}
}
