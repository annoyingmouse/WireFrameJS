export default class Tile {
    constructor(p5, x, y, dimension, img, degree) {
        this.p5 = p5;
        this.x = x;
        this.y = y;
        this.dimension = dimension;
        this.img = img;
        this.rotating = false;
        this.degree = degree;
        this.speed = 2;
    }
    rotate() {
        this.rotating = true;
        this.degree += this.speed;
    }
    draw() {
        this.p5.push();
        this.p5.translate(this.x + (this.dimension / 2), this.y + (this.dimension / 2));
        this.p5.rotate(this.degree);
        this.p5.translate(-this.x - (this.dimension / 2), -this.y - (this.dimension / 2));
        this.p5.image(this.img, this.x, this.y, this.dimension, this.dimension);
        this.p5.pop();
        if (this.rotating) {
            if (this.degree === 180) {
                this.degree = 0;
                this.rotating = false;
            }
            if (this.degree === 0 || this.degree === 90) {
                this.rotating = false;
            } else {
                this.degree += this.speed;
            }
        }
    }
}