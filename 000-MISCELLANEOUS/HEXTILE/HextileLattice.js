export class HextileLattice {
  constructor(p5, width, height, hexSize, colour) {
    this.p5 = p5;
    this.colour = colour;
    this.hexSize = hexSize;
    this.patternCnv = p5.createGraphics(width, height);
    this.bufferCnv = p5.createGraphics(width, height);
    this.pattern = null;
  }
  getPattern = () => {
    this.p5.pixelDensity(1);
    this.patternCnv.pixelDensity(1);
    this.bufferCnv.pixelDensity(1);
    this.patternCnv.fill(this.colour);
    this.patternCnv.noStroke();
    let count = 0;
    for (let y = 0; y < this.bufferCnv.height; y += this.hexSize / 2.3) {
      for (let x = 0; x < this.bufferCnv.width; x += this.hexSize * 1.5) {
        if (
          y > this.hexSize / 2.3 &&
          y < this.bufferCnv.height - this.hexSize / 2.3 &&
          x !== 0 &&
          x < this.bufferCnv.width - this.hexSize * 1.5
        ) {
          this.drawHexagon(
            x + this.hexSize * (count % 2 == 0) * 0.75,
            y,
            this.hexSize / 2,
            this.colour,
          );
        }
      }
      count++;
    }
    this.patternCnv.noFill();
    this.patternCnv.stroke(0, 0, 0);
    this.patternCnv.strokeWeight(0);
    this.pattern = this.setupPattern();
    // this.setFill();
    // this.bufferCnv.noStroke();
    this.bufferCnv.square(0, 0, this.bufferCnv.width);
    console.log(this.bufferCnv);
    return this.bufferCnv;
  };
  setupPattern = () => {
    console.log(this.patternCnv.canvas);
    return this.bufferCnv.drawingContext.createPattern(
      this.patternCnv.canvas,
      "repeat",
    );
  };
  setFill = () => {
    this.bufferCnv.fill(0);
    this.bufferCnv._renderer._setFill(this.pattern);
  };
  drawHexagon = (cX, cY, r) => {
    this.p5.push();
    this.p5.beginShape();
    this.p5.strokeWeight(r / 2);
    this.p5.stroke(this.colour);
    for (let a = 0; a < this.p5.TAU; a += this.p5.TAU / 6) {
      this.p5.vertex(cX + r * this.p5.cos(a), cY + r * this.p5.sin(a));
    }
    this.p5.endShape(this.p5.CLOSE);
    this.p5.pop();
  };
}
