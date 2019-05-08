export default class Pendulum {

    constructor(p5, origin, rope_length){
        console.log(origin);
        this.p5 = p5;
        this.origin = origin;
        this.position = p5.createVector();
        this.rope_length = rope_length;
        this.angle = p5.PI/4;
        this.aVelocity = 0.0;
        this.aAcceleration = 0.0;
        this.damping = 0.9999;
        this.ballr = 48.0;
        this.gravity = 0.7;
    }

    update() {
        this.aAcceleration = (-1 * this.gravity / this.rope_length) * this.p5.sin(this.angle);
        this.aVelocity += this.aAcceleration; 
        this.aVelocity *= this.damping;
        this.angle += this.aVelocity;  
        this.display();
    }

    display() {
        this.position.set(this.rope_length * this.p5.sin(this.angle), this.rope_length * this.p5.cos(this.angle), 0);
        this.position.add(this.origin);
        this.p5.stroke(255);
        this.p5.strokeWeight(1);
        this.p5.line(this.origin.x, this.origin.y, this.position.x, this.position.y);
        this.p5.ellipseMode(this.p5.CENTER);
        this.p5.fill(Math.floor(this.rope_length / 2));
        this.p5.ellipse(this.position.x, this.position.y, this.ballr, this.ballr);
    }
}