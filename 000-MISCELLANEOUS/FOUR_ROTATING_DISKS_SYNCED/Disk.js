export class Disk {
  constructor(
    p5,
    x,
    y,
    radius,
    startAngle,
    onColour,
    offColour,
    translateTo,
    segments,
    done,
    animating
  ) {
    this.p5 = p5;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.onColour = onColour || "#FFFFFF";
    this.offColour = offColour || "#000000";
    this.startAngle = startAngle || 0;
    this.translateTo = translateTo || 0;
    this.increment = (3.6 / segments) * 2;
    this.segments = segments || 4;
    this.sixteenth = 360 / this.segments;
    this.done = done || false;
    this.animating = animating || false;
  }
  draw = () => {
    this.p5.noStroke();
    for (let i = 0; i < this.segments; i++) {
      this.p5.fill(i % 2 === 0 ? this.onColour : this.offColour);
      this.p5.noStroke();
      this.p5.arc(
        this.x,
        this.x,
        this.radius,
        this.radius,
        this.startAngle + this.sixteenth * i,
        this.startAngle + this.sixteenth * i + this.sixteenth,
        this.p5.PIE,
      );
    }
    if(this.animating) {
      if (this.startAngle < this.translateTo) {
        if (this.startAngle + this.increment >= this.translateTo) {
          this.startAngle = this.translateTo;
          this.done = true;
        } else {
          this.startAngle += this.increment;
        }
      } else{
        this.done = true;
      }
    }
    if (this.startAngle === this.translateTo) {
      this.animating = false;
    }
  };
}
