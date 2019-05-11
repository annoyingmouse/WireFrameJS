export default class Star {

    constructor(p5, pos, vel) {
        this.p5 = p5;
        this.pos = pos;
        this.vel = vel;
        this.brightness = 10;
        this.speed = Math.hypot(vel);
        this.trail_length = 2
    }

    end_pos(warp_factor) {
        const { x, y } = this.pos;
        const { x: vx, y: vy } = this.vel;
        return this.p5.createVector(
            x - vx * warp_factor * this.trail_length / 60,
            y - vy * warp_factor * this.trail_length / 60
        )
    }
}