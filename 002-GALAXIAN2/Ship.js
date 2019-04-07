export default class Ship {

    constructor(p5, x, y, img, angle) {
        this.p5 = p5;
        this.x = x;
        this.y = y;
        this.img = this.p5.loadImage(img);
        this.angle = angle;
    }

    draw() {
        this.p5.translate(this.x, this.y);
        this.p5.translate(0, 0);
        this.p5.rotate(this.angle)
        this.p5.image(this.img, 0, 0);
    }

}