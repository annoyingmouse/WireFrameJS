export default class Ball {

    constructor(p5, x, y) {
        this.p5 = p5;
        this.radius = 5;
        this.x = x - this.radius;
        this.y = y - this.radius;
        this.velocity = {
            x: this.p5.random(-200, 201) * 0.01,
            y: 4
        };
    }

    reset(x, y) {
        this.x = x - this.radius;
        this.y = y - this.radius;
        this.velocity.x = this.p5.random(-200, 201) * 0.01;
    }

    move() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.draw();
    }

    draw() {
        this.p5.fill(255);
        this.p5.noStroke();
        this.p5.ellipse(this.x, this.y, this.radius * 2);
    }
}