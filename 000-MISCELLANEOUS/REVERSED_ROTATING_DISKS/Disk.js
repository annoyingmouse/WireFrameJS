export class Disk {
  constructor(p5, x, y, radius, startAngle, onColour, offColour, translateTo) {
    this.p5 = p5;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.onColour = onColour || "#FFFFFF";
    this.offColour = offColour || "#000000";
    this.startAngle = startAngle || 0;
    this.translateTo = translateTo || 0;
    this.increment = (this.translateTo - this.startAngle) / 720;
    this.sixth = 360 / 6;
  }
  draw = () => {
    this.p5.noStroke();
    for (let i = 0; i < 6; i++) {
      this.p5.fill(i % 2 === 0 ? this.onColour : this.offColour);
      this.p5.noStroke();
      this.p5.arc(
        this.x,
        this.x,
        this.radius,
        this.radius,
        this.startAngle + this.sixth * i,
        this.startAngle + this.sixth * i + this.sixth,
        this.p5.PIE,
      );
    }
    if (this.startAngle < this.translateTo) {
      if (this.startAngle + this.increment > this.translateTo) {
        this.startAngle = this.translateTo;
      } else {
        this.startAngle += this.increment;
      }
    } else {
      this.startAngle = this.translateTo;
    }
  };
}
