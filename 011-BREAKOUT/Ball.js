export default class Ball {

    constructor(p5, x, y) {
        this.p5 = p5;
        this.radius = 5;
        this.x = x - this.radius;
        this.y = y - this.radius;
        this.velocity = [this.p5.random(-200, 201), 400];
    }

    bounce(direction, tweak) {
        if (direction === "left") {
            this.velocity[0] = -Math.abs(this.velocity[0]);
        }
        if (direction === "right") {
            this.velocity[0] = Math.abs(this.velocity[0]);
        }
        if (direction === "down") {
            this.velocity[1] = Math.abs(this.velocity[1]);
        }
        if (direction === "up") {
            this.velocity[1] = -Math.abs(this.velocity[1]);
            this.velocity[0] += tweak;
        }
    }

    reset(x, y) {
        this.x = x - this.radius;
        this.y = y - this.radius;
        this.velocity = [this.p5.random(-200, 201), 400];
    }

    move() {
        this.x += this.velocity[0] * 0.01;
        this.y += this.velocity[1] * 0.01;
        this.draw();
    }

    draw() {
        this.p5.fill(255);
        this.p5.noStroke();
        this.p5.ellipse(this.x, this.y, this.radius * 2);
    }
}