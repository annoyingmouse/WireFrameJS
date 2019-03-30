export default class TailPiece {
    constructor(p5, x, y, img) {
        this.p5 = p5;
        this.x = x;
        this.y = y;
        this.img = this.p5.loadImage(img);
        this.size = 50;
        this.wobble = 0.8;
        this.angle = 2.5;
        this.phase_step = 0.3;
        this.speed = 4.0;
    }

    update(obj) {
        this.x = obj.x;
        this.y = obj.y;
        const temp_angle = this.angle + this.wobble * Math.sin(obj.index * this.phase_step + obj.timer * this.speed);
        return {
            x: obj.x += this.size * Math.cos(temp_angle),
            y: obj.y -= this.size * Math.sin(temp_angle)
        }
    }

    draw() {
        this.p5.image(this.img, this.x, this.y);
    }

}