export class SliderNumeral {
	constructor(
		p5,
		x,
		y,
		unitWidth,
		unitHeight,
		orange = "#FF3131",
		black = "#000000",
		transparency = "#00000011",
	) {
		this.p5 = p5;
		this.x = x;
		this.y = y;
		this.unitWidth = unitWidth;
		this.unitHeight = unitHeight;
		this.orange = orange;
		this.black = black;
		this.transparency = transparency;
		this.pg = p5.createGraphics(unitWidth * 3, unitHeight * 26);
		this.numeralOffset = 8;
		this.firstColumnOffset = 0;
		this.otherColumnsOffset = 0;
	}

	update(num) {
		const positions = [
			[5, 6], // 0
			[0, 0], // 1
			[7, 11], // 2
			[9, 7], // 3
			[3, 4], // 4
			[11, 9], // 5
			[5, 9], // 6
			[1, 2], // 7
			[5, 1], // 8
			[11, 1], // 9
		];
		this.pg.clear();
		if (!this.firstColumnOffset !== positions[num][0] * this.unitHeight) {
			if (this.firstColumnOffset < positions[num][0] * this.unitHeight) {
				this.firstColumnOffset += 1;
			} else {
				this.firstColumnOffset -= 1;
			}
		}
		if (!this.otherColumnsOffset !== positions[num][1] * this.unitHeight) {
			if (this.otherColumnsOffset < positions[num][1] * this.unitHeight) {
				this.otherColumnsOffset += 1;
			} else {
				this.otherColumnsOffset -= 1;
			}
		}
		this.draw();
	}

	draw() {
		this.pg.noStroke();
		this.pg.fill(100);
		this.pg.rect(0, 0, this.unitWidth * 3, this.unitHeight * 26);
		this.figureEight(0, 0, this.unitWidth, this.unitHeight);
		this.firstColumn(0, 0, this.unitWidth, this.unitHeight);
		this.otherColumns(0, 0, this.unitWidth, this.unitHeight);
		return this.p5.image(this.pg, this.x, this.y);
	}

	drawSquare = (x, y, unitWidth, unitHeight, color, stroke = false) => {
		if (stroke) {
			this.pg.strokeWeight(1);
			this.pg.stroke(51);
		} else {
			this.pg.noStroke();
		}
		this.pg.fill(color);
		this.pg.beginShape();
		this.pg.vertex(x, y);
		this.pg.vertex(x + unitWidth, y);
		this.pg.vertex(x + unitWidth, y + unitHeight);
		this.pg.vertex(x, y + unitHeight);
		this.pg.endShape();
	};

	figureEight = (x, y, unitWidth, unitHeight) => {
		const figure = [
			[1, 1, 1],
			[1, 0, 1],
			[1, 1, 1],
			[1, 0, 1],
			[1, 1, 1],
		];
		for (let y = 8; y < figure.length + this.numeralOffset; y++) {
			for (let x = 0; x < figure[y - this.numeralOffset].length; x++) {
				if (figure[y - this.numeralOffset][x] === 1) {
					this.drawSquare(
						x * unitWidth,
						y * unitHeight,
						unitWidth,
						unitHeight,
						this.orange,
						false,
					);
				}
			}
		}
	};
	firstColumn = (x, y, unitWidth, unitHeight) => {
		const figure = [1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1];
		for (let y = 0; y < figure.length; y++) {
			if (figure[y] === 1) {
				this.drawSquare(
					x,
					y * unitHeight + this.firstColumnOffset,
					unitWidth,
					unitHeight,
					this.black,
					true,
				);
			} else {
				this.drawSquare(
					x,
					y * unitHeight + this.firstColumnOffset,
					unitWidth,
					unitHeight,
					this.transparency,
					true,
				);
			}
		}
	};
	otherColumns = (x, y, unitWidth, unitHeight) => {
		const figure = [
			[0, 1],
			[0, 0],
			[0, 0],
			[0, 0],
			[1, 0],
			[0, 0],
			[0, 0],
			[0, 0],
			[1, 0],
			[0, 0],
			[1, 0],
			[0, 0],
			[1, 0],
			[0, 0],
			[0, 1],
		];
		for (let y = 0; y < figure.length; y++) {
			for (let x = 0; x < figure[y].length; x++) {
				if (figure[y][x] === 1) {
					this.drawSquare(
						(x + 1) * unitWidth,
						y * unitHeight + this.otherColumnsOffset,
						unitWidth,
						unitHeight,
						this.black,
						true,
					);
				} else {
					this.drawSquare(
						(x + 1) * unitWidth,
						y * unitHeight + this.otherColumnsOffset,
						unitWidth,
						unitHeight,
						this.transparency,
						true,
					);
				}
			}
		}
	};
}
