export class SquareCircle {
  constructor(p5, fill, canvas_dimension, width, countdown = 0) {
    this.p5 = p5;
    this.fill = fill;
    this.canvas_dimension = canvas_dimension;
    this.width = width;
    this.angle = 0;
    this.roundedness = 0;
    this.max_roundedness = this.width / 2;
    this.roundedness_degree = this.max_roundedness / 90;
    this.clockwise = true;
    this.countdown = countdown;
  }
  easeInOutQuad(x) {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  }
  draw() {
    this.p5.push();
    this.p5.fill(this.fill);
    this.p5.noStroke();
    this.p5.translate(this.canvas_dimension / 2, this.canvas_dimension / 2);
    this.p5.rotate((this.easeInOutQuad(this.angle / 90)) * 90);
    this.p5.rect(
      -(this.max_roundedness),
      -(this.max_roundedness),
      this.width,
      this.width,
      (this.easeInOutQuad(this.roundedness / this.max_roundedness)) * this.max_roundedness,
    );
    this.p5.pop();
    if (this.countdown === 0) {
      if (this.clockwise) {
        this.angle += 1;
        this.roundedness += this.roundedness_degree;
        if (this.angle === 90) {
          this.clockwise = false;
        }
      } else {
        this.angle -= 1;
        if (this.roundedness - this.roundedness_degree < 0) {
          this.roundedness = 0;
        } else {
          this.roundedness -= this.roundedness_degree;
        }
        if (this.angle === 0) {
          this.clockwise = true;
        }
      }
    } else {
      this.countdown -= 1;
    }
  }
}
