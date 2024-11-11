class Field {
	constructor(x, y, raw, scale) {
		this.x = x;
		this.y = y;
		this.rows = raw.split("\n").filter((x) => x.length > 0);
		this.scale = scale;
		this.permittedRoutes = [];
		this.portals = [];
		this.generateRoutes();
		this.dots = [];
		this.generateDots();
		this.lines = "═║╔╗╚╝╦╩╠╣";
	}

	draw() {
		this.drawLines("#2424ff", 7);
		this.drawLines("#246dff", 5);
		this.drawLines("#000049", 3);
		//this.drawGrid();
	}

	getScale() {
		return this.scale;
	}

	ask(x, y) {
		return this.permittedRoutes.find((el) => el.x === x && el.y === y);
	}
	portal() {
		return this.portals;
	}

	drawGrid() {
		this.rows.forEach((row, rowIndex, rowArray) => {
			const columns = row.split("");
			columns.forEach((column, columnIndex, colArray) => {
				stroke("#ff0000");
				strokeWeight(1);
				noFill();
				rect(
					(columnIndex + 1) * this.scale + this.x,
					(rowIndex + 1) * this.scale + this.y,
					this.scale,
					this.scale,
				);
			});
		});
	}

	generateRoutes() {
		this.rows.forEach((row, rowIndex, rowArray) => {
			const columns = row.split("");
			columns.forEach((column, columnIndex, colArray) => {
				const directions = {
					x: (columnIndex + 1) * this.scale + this.scale / 2 + this.x,
					y: (rowIndex + 1) * this.scale + this.scale / 2 + this.y,
					allowed: [],
				};
				if (columnIndex) {
					const leftCell = colArray[columnIndex - 1];
					if (
						leftCell === " " ||
						leftCell === "X" ||
						leftCell === "•" ||
						leftCell === "*"
					) {
						directions.allowed.push("LEFT");
					}
				}
				if (columnIndex < colArray.length - 1) {
					const rightCell = colArray[columnIndex + 1];
					if (
						rightCell === " " ||
						rightCell === "X" ||
						rightCell === "•" ||
						rightCell === "*"
					) {
						directions.allowed.push("RIGHT");
					}
				}
				if (rowIndex) {
					const upCell = rowArray[rowIndex - 1][columnIndex];
					if (
						upCell === " " ||
						upCell === "X" ||
						upCell === "•" ||
						upCell === "*"
					) {
						directions.allowed.push("UP");
					}
				}
				if (rowIndex < rowArray.length - 1) {
					const downCell = rowArray[rowIndex + 1][columnIndex];
					if (
						downCell === " " ||
						downCell === "X" ||
						downCell === "•" ||
						downCell === "*"
					) {
						directions.allowed.push("DOWN");
					}
				}
				if (column === "X") {
					this.portals.push([
						(columnIndex + 1) * this.scale + this.scale / 2 + this.x,
						(rowIndex + 1) * this.scale + this.scale / 2 + this.y,
					]);
				}
				this.permittedRoutes.push(directions);
			});
		});
	}

	generateDots() {
		this.rows.forEach((row, rowIndex, rowArray) => {
			const columns = row.split("");
			columns.forEach((column, columnIndex, colArray) => {
				const dot = {
					x: (columnIndex + 1) * this.scale + this.scale / 2 + this.x,
					y: (rowIndex + 1) * this.scale + this.scale / 2 + this.y,
				};
				if (column === "•") {
					dot.type = "Dot";
					this.dots.push(dot);
				}
				if (column === "*") {
					dot.type = "Pill";
					this.dots.push(dot);
				}
			});
		});
	}

	drawLines(colour, lineWidth) {
		this.rows.forEach((row, rowIndex, rowArray) => {
			const columns = row.split("");
			columns.forEach((column, columnIndex, colArray) => {
				const x = [
					(columnIndex + 1) * this.scale + this.x,
					(columnIndex + 1) * this.scale + this.scale / 2 + this.x,
					(columnIndex + 1) * this.scale + this.scale + this.x,
				];
				const y = [
					(rowIndex + 1) * this.scale + this.y,
					(rowIndex + 1) * this.scale + this.scale / 2 + this.y,
					(rowIndex + 1) * this.scale + this.scale + this.y,
				];
				stroke(colour);
				strokeWeight(lineWidth);
				strokeCap(ROUND);
				switch (column) {
					case "═":
						const cellLeft = colArray[columnIndex - 1];
						if (this.lines.indexOf(cellLeft) === -1) {
							line(x[1], y[1], x[2], y[1]);
						} else {
							const cellRight = colArray[columnIndex + 1];
							if (this.lines.indexOf(cellRight) === -1) {
								line(x[0], y[1], x[1], y[1]);
							} else {
								line(x[0], y[1], x[2], y[1]);
							}
						}
						break;
					case "║":
						const cellAbove = rowArray[rowIndex - 1][columnIndex];
						if (this.lines.indexOf(cellAbove) === -1) {
							line(x[1], y[1], x[1], y[2]);
						} else {
							const cellBeneath = rowArray[rowIndex + 1][columnIndex];
							if (this.lines.indexOf(cellBeneath) === -1) {
								line(x[1], y[0], x[1], y[1]);
							} else {
								line(x[1], y[0], x[1], y[2]);
							}
						}
						break;
					case "╔":
						line(x[1], y[1], x[2], y[1]);
						line(x[1], y[1], x[1], y[2]);
						break;
					case "╗":
						line(x[1], y[1], x[0], y[1]);
						line(x[1], y[1], x[1], y[2]);
						break;
					case "╚":
						line(x[1], y[1], x[2], y[1]);
						line(x[1], y[1], x[1], y[0]);
						break;
					case "╝":
						line(x[1], y[1], x[0], y[1]);
						line(x[1], y[1], x[1], y[0]);
						break;
					case "╦":
						line(x[0], y[1], x[2], y[1]);
						line(x[1], y[1], x[1], y[2]);
						break;
					case "╩":
						line(x[0], y[1], x[2], y[1]);
						line(x[1], y[1], x[1], y[0]);
						break;
					case "╠":
						line(x[1], y[0], x[1], y[2]);
						line(x[1], y[1], x[2], y[1]);
						break;
					case "╣":
						line(x[1], y[0], x[1], y[2]);
						line(x[1], y[1], x[0], y[1]);
						break;
				}
			});
		});
		this.dots.forEach((dot, dotIndex, dotArray) => {
			fill("#FFB897");
			noStroke();
			if (dot.type !== "Dot") {
				ellipse(dot.x, dot.y, 6, 6);
			} else {
				ellipse(dot.x, dot.y, 2, 2);
			}
		});
	}

	chomp(x, y) {
		let dotIndex = null;
		this.dots.forEach((dot, index) => {
			if (dot.x === x && dot.y === y) {
				dotIndex = index;
			}
		});
		if (dotIndex !== null) {
			return this.dots.splice(dotIndex, 1)[0];
		} else {
			return null;
		}
	}
}
