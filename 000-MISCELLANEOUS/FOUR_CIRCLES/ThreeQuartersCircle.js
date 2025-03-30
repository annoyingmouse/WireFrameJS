export class ThreeQuartersCircle {
  constructor(p5, x, y, radius, startAngle, colour, translateTo, speed) {
    this.p5 = p5;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.colour = colour || "#000000";
    this.startAngle = startAngle || 0;
    this.translateTo = translateTo || 0;
    this.initialAngle = startAngle;
    this.initialTranslateTo = translateTo;
    this.speed = speed || 0.5;
  }
  draw = () => {
    this.p5.noStroke();
    for (let i = 0; i < 6; i++) {
      this.p5.fill(this.colour);
      this.p5.noStroke();
      this.p5.arc(
        this.x,
        this.y,
        this.radius,
        this.radius,
        this.startAngle,
        this.startAngle + 270,
      );
    }
    if (this.startAngle !== this.translateTo) {
      if (this.startAngle > this.translateTo) {
        this.startAngle -= this.speed;
      } else {
        this.startAngle += this.speed;
      }
    } else {
      if (this.startAngle === this.initialTranslateTo) {
        this.translateTo = this.initialAngle;
      } else {
        this.translateTo = this.initialTranslateTo;
      }
    }
  };
}
