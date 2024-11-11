/**
 * Converted from https://github.com/jeffrey-hearn/poisson-disk-sample/blob/master/poisson-disk.js
 */

Array.prototype.remove = function (from, to) {
	const rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};

class Grid {
	constructor(width, height, minDistance) {
		this.width = width;
		this.height = height;
		this.minDistance = minDistance;
		this.cellSize = this.minDistance / Math.SQRT2;
		this.pointSize = 2;
		this.cellsWide = Math.ceil(this.width / this.cellSize);
		this.cellsHigh = Math.ceil(this.height / this.cellSize);
		this.grid = [];
		for (let x = 0; x < this.cellsWide; x++) {
			this.grid[x] = [];
			for (let y = 0; y < this.cellsHigh; y++) {
				this.grid[x][y] = null;
			}
		}
	}

	pixelsToGridCoords(point) {
		const gridX = Math.floor(point.x / this.cellSize);
		const gridY = Math.floor(point.y / this.cellSize);
		return { x: gridX, y: gridY };
	}

	addPointToGrid(pointCoords, gridCoords) {
		if (gridCoords.x < 0 || gridCoords.x > this.grid.length - 1) return false;
		if (gridCoords.y < 0 || gridCoords.y > this.grid[gridCoords.x].length - 1)
			return false;
		this.grid[gridCoords.x][gridCoords.y] = pointCoords;
		return true;
	}

	randomPoint() {
		return {
			x: this.getRandomArbitrary(0, this.width),
			y: this.getRandomArbitrary(0, this.height),
		};
	}

	randomPointAround(point) {
		const r1 = Math.random();
		const r2 = Math.random();
		const radius = this.minDistance * (r1 + 1);
		const angle = 2 * Math.PI * r2;
		const x = point.x + radius * Math.cos(angle);
		const y = point.y + radius * Math.sin(angle);
		return { x, y };
	}

	inNeighborhood(point) {
		const gridPoint = this.pixelsToGridCoords(point);
		const cellsAroundPoint = this.cellsAroundPoint(point);
		for (let i = 0; i < cellsAroundPoint.length; i++) {
			if (cellsAroundPoint[i] != null) {
				if (this.calcDistance(cellsAroundPoint[i], point) < this.minDistance) {
					return true;
				}
			}
		}
		return false;
	}
	cellsAroundPoint(point) {
		const gridCoords = this.pixelsToGridCoords(point);
		const neighbors = [];

		for (let x = -2; x < 3; x++) {
			let targetX = gridCoords.x + x;
			if (targetX < 0) {
				targetX = 0;
			}
			if (targetX > this.grid.length - 1) {
				targetX = this.grid.length - 1;
			}

			for (let y = -2; y < 3; y++) {
				let targetY = gridCoords.y + y;
				if (targetY < 0) {
					targetY = 0;
				}
				if (targetY > this.grid[targetX].length - 1) {
					targetY = this.grid[targetX].length - 1;
				}
				neighbors.push(this.grid[targetX][targetY]);
			}
		}
		return neighbors;
	}
	calcDistance(pointInCell, point) {
		return Math.sqrt(
			(point.x - pointInCell.x) * (point.x - pointInCell.x) +
				(point.y - pointInCell.y) * (point.y - pointInCell.y),
		);
	}
	getRandomArbitrary(min, max) {
		return Math.random() * (max - min) + min;
	}
	drawGrid(canvas) {
		canvas.lineWidth = 0.05;
		canvas.strokeStyle = "black";
		canvas.beginPath();
		canvas.moveTo(0, 0);
		canvas.lineTo(this.width, 0);
		canvas.lineTo(this.width, this.height);
		canvas.lineTo(0, this.height);
		canvas.lineTo(0, 0);
		canvas.stroke();
		for (let x = 1; x < this.cellsWide; x++) {
			canvas.beginPath();
			canvas.moveTo(x * this.cellSize, 0);
			canvas.lineTo(x * this.cellSize, this.height);
			canvas.stroke();
		}
		for (let y = 1; y < this.cellsHigh; y++) {
			canvas.beginPath();
			canvas.moveTo(0, y * this.cellSize);
			canvas.lineTo(this.width, y * this.cellSize);
			canvas.stroke();
		}
	}
	drawPoint(point, color, canvas) {
		// Default color
		color = color || "#aaa";
		// Draw a circle
		canvas.beginPath();
		// arc(x, y, radius, startAngle, endAngle, anticlockwise)
		canvas.arc(point.x, point.y, this.pointSize, 0, 2 * Math.PI, false);
		canvas.fillStyle = color;
		canvas.fill();
	}
}

class RandomQueue {
	constructor(a) {
		this.queue = a || [];
	}
	push(element) {
		this.queue.push(element);
	}
	pop() {
		let randomIndex = this.getRandomInt(0, this.queue.length);
		while (this.queue[randomIndex] === undefined) {
			let empty = true;
			for (let i = 0; i < this.queue.length; i++) {
				if (this.queue[i] !== undefined) {
					empty = false;
				}
			}
			if (empty) {
				return null;
			}
			randomIndex = this.getRandomInt(0, this.queue.length);
		}

		const element = this.queue[randomIndex];
		this.queue.remove(randomIndex);
		return element;
	}
	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}

export class PoissonDiskSampler {
	constructor(width, height, minDistance, sampleFrequency) {
		this.width = width;
		this.height = height;
		this.minDistance = minDistance;
		this.sampleFrequency = sampleFrequency;
		this.reset();
	}
	reset() {
		this.grid = new Grid(this.width, this.height, this.minDistance);
		this.outputList = [];
		this.processingQueue = new RandomQueue();
	}
	sampleUntilSolution() {
		while (this.sample()) {}
		return this.outputList;
	}
	sample() {
		// If this is the first sample
		if (0 === this.outputList.length) {
			this.queueToAll(this.grid.randomPoint());
			return true;
		}
		const processPoint = this.processingQueue.pop();
		if (processPoint == null) {
			return false;
		}
		for (let i = 0; i < this.sampleFrequency; i++) {
			const samplePoint = this.grid.randomPointAround(processPoint);
			if (!this.grid.inNeighborhood(samplePoint)) {
				// No on in neighborhood, welcome to the club
				this.queueToAll(samplePoint);
			}
		}
		return true;
	}
	queueToAll(point) {
		const valid = this.grid.addPointToGrid(
			point,
			this.grid.pixelsToGridCoords(point),
		);
		if (!valid) {
			return;
		}
		this.processingQueue.push(point);
		this.outputList.push(point);
	}
	drawOutputList(canvas) {
		for (let i = 0; i < this.outputList.length; i++) {
			this.grid.drawPoint(this.outputList[i], "#444", canvas);
		}
	}
}
