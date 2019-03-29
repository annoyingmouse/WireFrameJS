export default class Enemy {

    constructor(p5, x, y, img) {
        this.p5 = p5;
        this.x = x;
        this.y = y;
        this.img = this.p5.loadImage(img);
    }

    draw() {
        this.p5.image(this.img, this.x, this.y);
    }

}