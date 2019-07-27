export default class Cell {
    constructor(p5, i, j, w, cols) {
        this.p5 = p5;
        this.i = i;
        this.j = j;
        this.w = w;
        this.walls = {
            top: true,
            right: true,
            bottom: true,
            left: true
        };
        this.visited = false;
        this.cols = cols;
    }

    index(i, j) {
        if (i < 0 || j < 0 || i > this.cols - 1 || j > this.cols - 1) {
            return undefined;
        }
        return i + j * this.cols;
    }

    draw() {
        this.p5.stroke(255);
        const x = this.i * this.w;
        const y = this.j * this.w;
        if (this.walls.top) {
            this.p5.line(x, y, x + this.w, y);
        }
        if (this.walls.right) {
            this.p5.line(x + this.w, y, x + this.w, y + this.w);
        }
        if (this.walls.bottom) {
            this.p5.line(x + this.w, y + this.w, x, y + this.w);
        }
        if (this.walls.left) {
            this.p5.line(x, y + this.w, x, y);
        }
        if (this.visited) {
            this.p5.noStroke();
            this.p5.fill(255, 0, 255, 100);
            this.p5.rect(x, y, this.w, this.w);
        }
    }

    checkNeighbours(grid) {
        const neighbours = [];
        let top = grid[this.index(this.i, this.j - 1)];
        let right = grid[this.index(this.i + 1, this.j)];
        let bottom = grid[this.index(this.i, this.j + 1)];
        let left = grid[this.index(this.i - 1, this.j)];
        if (top && !top.visited) {
            neighbours.push(top);
        }
        if (right && !right.visited) {
            neighbours.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbours.push(bottom);
        }
        if (left && !left.visited) {
            neighbours.push(left);
        }
        if (neighbours.length) {
            return neighbours[Math.floor(this.p5.random(0, neighbours.length))]
        } else {
            return undefined;
        }
    }

    highlight() {
        const x = this.i * this.w;
        const y = this.j * this.w;
        this.p5.noStroke();
        this.p5.fill(0, 0, 255, 100);
        this.p5.rect(x, y, this.w, this.w);
    }
}