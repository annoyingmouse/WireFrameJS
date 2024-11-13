import Rectangle from "./Rectangle.js";

export default class Safety extends Rectangle {
  constructor(index, grid, p5Width) {
    super(0, index * grid, p5Width, grid);
    this.type = "SAFETY";
  }

  run(p5) {
    p5.fill(100);
    p5.rect(this.x, this.y, this.width, this.height);
  }
}
