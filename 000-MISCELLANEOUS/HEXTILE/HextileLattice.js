export class HextileLattice {
  constructor(p5, width, height, hexSize, colour) {
    this.p5 = p5;
    this.colour = colour;
    this.width = width;
    this.height = height;
    this.hexSize = hexSize;
    this.patternCnv = p5.createGraphics(width, height);
    this.bufferCnv = p5.createGraphics(width, height);
    this.pattern = null;
  }
  isOdd = (num) => num % 2;
  drawHexagon = (cX, cY, r) => {
    this.p5.beginShape();
    for (let a = 0; a < this.p5.TAU; a += this.p5.TAU / 6) {
      this.p5.vertex(cX + r * this.p5.cos(a), cY + r * this.p5.sin(a));
    }
    this.p5.endShape(this.p5.CLOSE);
  };
  makeGrid = () => {
    let count = 0;
    for (let y = 0; y < this.height; y += this.hexSize / 2.3) {
      for (let x = 0; x < this.width; x += this.hexSize * 1.5) {
        this.drawHexagon(
          x + this.hexSize * (count % 2 === 0) * 0.75,
          y,
          this.hexSize / 2,
        );
      }
      count++;
    }
  };
}
