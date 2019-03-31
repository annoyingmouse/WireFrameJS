export default class Platform {

    constructor(p5, x, y, width, height) {
        this.p5 = p5;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw() {
        this.p5.fill(128, 0, 0);
        this.p5.rect(this.x, this.y, this.width, this.height);
    }

}