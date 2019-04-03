export default class Missile {
    constructor(p5, x, vx, y = 0, vy = 20){
        this.p5 = p5;
        this.x = x;
        this.vx = vx;
        this.y = y;
        this.vy = vy;
        this.t = Math.floor(this.p5.random(0, 3));
        this.age = 0;
        this.trail = [];
        this.gravity = 5;
        this.trail_length = 800;
        this.trail_brightness = 100;
    }

    step(dt) {
        this.t += this.age;
        const uy = this.vy;
        this.vy += this.gravity * this.age;
        this.y += 0.5 * (uy + this.vy) * this.age;
        this.x += this.vx * this.age;
        this.trail.unshift({
            x: this.x,
            y: this.y
        });
        this.age += 1;
        console.log("this.trail", this.trail);
        this.draw();
    }

    draw() {
        this.trail.some((item, index) => {
            if(index + 1 === this.trail.length){
                return;
            }
            const start = item;
            const end = this.trail[index + 1];
            const colour = this.trail_brightness * (1 - (index / this.trail_length));
            this.p5.stroke(colour, colour, colour);
            this.p5.line(start.x, start.y, end.x, end.y);
        });
        this.p5.fill(255, 220, 160);
        this.p5.circle(this.x, this.y, 2);
        const flare_length = 4 + Math.sin(this.t) *  2 + Math.sin(this.t * 5) * 1;
        this.p5.line(this.x - flare_length, this.y, this.x + flare_length, this.y);
    }
}