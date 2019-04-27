export default class Block {
    constructor(p5, x, y, size) {
        this.p5 = p5;
        this.x = x;
        this.y = y;
        this.width = size;
        this.height = size;
    }

    draw() {
        this.p5.noStroke();
        this.p5.fill(...this.colour);
        this.p5.rect(this.x, this.y, this.width, this.height);
    }
}