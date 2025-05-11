export class SquareCircle {
  constructor(p5, fill, canvas_dimension, diameter, countdown = 0) {
    this.p5 = p5;
    this.fill = fill;
    this.canvas_dimension = canvas_dimension;
    this.diameter = diameter;
    this.angle = 0;
    this.roundedness = 0;
    this.roundedness_degree = this.diameter / 2 / 90;
    this.clockwise = true;
    this.countdown = countdown;
  }
  draw() {
    this.p5.push();
    this.p5.fill(this.fill);
    this.p5.noStroke();
    this.p5.translate(this.canvas_dimension / 2, this.canvas_dimension / 2);
    this.p5.rotate(this.angle);
    this.p5.rect(
      -(this.diameter / 2),
      -(this.diameter / 2),
      this.diameter,
      this.diameter,
      this.roundedness,
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
