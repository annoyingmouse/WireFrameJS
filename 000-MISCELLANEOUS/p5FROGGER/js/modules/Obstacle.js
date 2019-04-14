import Rectangle from "./Rectangle.js";

export default class Obstacle extends Rectangle {

    constructor(x, y, width, height, speed, grid, colour) {
        super(x, y, width, height);
        this.speed = speed;
        this.grid = grid;
        this.colour = colour;
    }

    update(p5) {
        this.x = this.x + this.speed;
        if ((this.speed > 0) && (this.x > p5.width + this.grid)) {
            this.x = -Math.abs(this.width) - this.grid;
        }
        if ((this.speed < 0) && this.x < -Math.abs(this.width) - this.grid) {
            this.x = p5.width + this.grid;
        }
    }

    show(p5) {
        p5.fill(this.colour);
        p5.rect(this.x, this.y, this.width, this.height);
    }
}