export default class Brick {
    constructor(p5, x, y, width, height, colour, highlight) {
        this.p5 = p5;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.colour = colour;
        this.highlight = highlight;
    }

    draw() {
        this.p5.noStroke();
        this.p5.fill(...this.colour);
        this.p5.rect(this.x, this.y, this.width, this.height);
        this.p5.strokeWeight(1);
        this.p5.stroke(...this.highlight);
        this.p5.line(this.x, this.y + this.height, this.x, this.y);
        this.p5.line(this.x, this.y, this.x + this.width, this.y);
    }
}