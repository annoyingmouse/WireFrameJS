export default class Ship {

    constructor(p5, x, y, img, angle) {
        this.p5 = p5;
        this.x = x;
        this.y = y;
        this.img = this.p5.loadImage(img);
        this.angle = angle;
        this.right = true;
        this.vx = 2;
    }

    update() {
        this.x = (this.direction) ? this.x + this.vx : this.x - this.vx;
        this.direction = (this.x === this.p5.width - 50 || this.x === 50) ? !this.direction : this.direction
        this.draw();
    }

    draw() {
        this.p5.translate(this.x, this.y);
        this.p5.translate(0, 0);
        this.p5.rotate(this.angle)
        this.p5.image(this.img, 0, 0);
    }

}