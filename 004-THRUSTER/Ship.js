export default class Ship {

    constructor(p5, x, y, img, angle) {
        this.p5 = p5;
        this.x = x;
        this.x_speed = 0;
        this.y = y;
        this.y_speed = 0;
        this.imgs = [this.p5.loadImage(img[0]), this.p5.loadImage(img[1])];
        this.image = this.imgs[0]
        this.acceleration = 0.02;
        this.angle = angle;
    }

    rotate(num) {
        this.angle += num;
    }

    trusting() {
        this.image = this.imgs[1];
    }

    coasting() {
        this.image = this.imgs[0];
    }

    accelerate() {
        this.x_speed += Math.cos(this.angle) * this.acceleration;
        this.y_speed -= Math.sin(this.angle) * this.acceleration;
    }

    draw() {
        this.x += this.x_speed;
        this.y -= this.y_speed;
        this.p5.translate(this.x, this.y);
        this.p5.translate(0, 0);
        this.p5.rotate(this.angle)
        this.p5.image(this.image, 0, 0);
    }

}