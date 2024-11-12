export class SliderNumeral {
	constructor(
		p5,
		backGroundColour,
		x,
		y,
		unitWidth,
		unitHeight,
		orange,
		black,
		transparency,
		fast = false,
	) {
		this.p5 = p5;
		this.backGroundColour = backGroundColour;
		this.x = x;
		this.y = y;
		this.unitWidth = unitWidth;
		this.unitHeight = unitHeight;
		this.orange = orange || "#FF3131";
		this.black = black || "#000000";
		this.transparency = transparency || "#00000033";
		this.pg = p5.createGraphics(unitWidth * 4, unitHeight * 26);
		this.numeralOffset = 8;
		this.firstColumnOffset = 0;
		this.otherColumnsOffset = 0;
		this.instant = fast;
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
				this.firstColumnOffset = this.instant
					? Math.abs(
							this.firstColumnOffset - positions[num][0] * this.unitHeight,
						) < 5
						? positions[num][0] * this.unitHeight
						: (this.firstColumnOffset += 5)
					: (this.firstColumnOffset += 1);
			} else {
				this.firstColumnOffset = this.instant
					? Math.abs(
							this.firstColumnOffset - positions[num][0] * this.unitHeight,
						) < 5
						? positions[num][0] * this.unitHeight
						: (this.firstColumnOffset -= 5)
					: (this.firstColumnOffset -= 1);
			}
		}
		if (!this.otherColumnsOffset !== positions[num][1] * this.unitHeight) {
			if (this.otherColumnsOffset < positions[num][1] * this.unitHeight) {
				this.otherColumnsOffset = this.instant
					? Math.abs(
							this.otherColumnsOffset - positions[num][1] * this.unitHeight,
						) < 5
						? positions[num][1] * this.unitHeight
						: (this.otherColumnsOffset += 5)
					: (this.otherColumnsOffset += 1);
			} else {
				this.otherColumnsOffset = this.instant
					? Math.abs(
							this.otherColumnsOffset - positions[num][1] * this.unitHeight,
						) < 5
						? positions[num][1] * this.unitHeight
						: (this.otherColumnsOffset -= 5)
					: (this.otherColumnsOffset -= 1);
			}
		}
		this.draw();
	}

	draw() {
		this.pg.noStroke();
		this.pg.fill(this.backGroundColour);
		this.pg.rect(0, 0, this.unitWidth * 4, this.unitHeight * 24);
		this.figureEight(0, 0, this.unitWidth, this.unitHeight);
		this.firstColumn(0, 0, this.unitWidth, this.unitHeight);
		this.otherColumns(0, 0, this.unitWidth, this.unitHeight);
		return this.p5.image(this.pg, this.x, this.y);
	}

	drawSquare = (x, y, unitWidth, unitHeight, color, stroke = false) => {
		if (stroke) {
			this.pg.strokeWeight(2);
			this.pg.stroke(51);
		} else {
			this.pg.noStroke();
		}
		this.pg.fill(color);
		this.pg.rect(x, y, unitWidth, unitHeight);
	};

	figureEight = (x, y, unitWidth, unitHeight) => {
		const figure = [
			[1, 1, 1],
			[1, 0, 1],
			[1, 1, 1],
			[1, 0, 1],
			[1, 1, 1],
		];
		this.pg.drawingContext.shadowColor = this.orange;
		this.pg.drawingContext.shadowBlur = this.unitHeight / 2;
		for (let y = 8; y < figure.length + this.numeralOffset; y++) {
			for (let x = 0; x < figure[y - this.numeralOffset].length; x++) {
				if (figure[y - this.numeralOffset][x] === 1) {
					this.drawSquare(
						(x + 0.5) * unitWidth,
						y * unitHeight,
						unitWidth,
						unitHeight,
						this.orange,
						false,
					);
				}
			}
		}
		this.pg.drawingContext.shadowColor = this.orange;
		this.pg.drawingContext.shadowBlur = this.unitHeight / 4;
		for (let y = 8; y < figure.length + this.numeralOffset; y++) {
			for (let x = 0; x < figure[y - this.numeralOffset].length; x++) {
				if (figure[y - this.numeralOffset][x] === 1) {
					this.drawSquare(
						(x + 0.5) * unitWidth,
						y * unitHeight,
						unitWidth,
						unitHeight,
						this.orange,
						false,
					);
				}
			}
		}
		this.pg.drawingContext.shadowColor = this.orange;
		this.pg.drawingContext.shadowBlur = 0;
	};
	firstColumn = (x, y, unitWidth, unitHeight) => {
		const figure = [1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1];
		for (let y = 0; y < figure.length; y++) {
			if (figure[y] === 1) {
				this.drawSquare(
					unitWidth / 2,
					y * unitHeight + this.firstColumnOffset,
					unitWidth,
					unitHeight,
					this.black,
					true,
				);
			} else {
				this.drawSquare(
					unitWidth / 2,
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
		];
		for (let y = 0; y < figure.length; y++) {
			for (let x = 0; x < figure[y].length; x++) {
				if (figure[y][x] === 1) {
					this.drawSquare(
						(x + 1.5) * unitWidth,
						y * unitHeight + this.otherColumnsOffset,
						unitWidth,
						unitHeight,
						this.black,
						true,
					);
				} else {
					this.drawSquare(
						(x + 1.5) * unitWidth,
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
