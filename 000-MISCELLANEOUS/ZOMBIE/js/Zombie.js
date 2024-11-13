export class Zombie {
  constructor(images, x, y, steps, lurch, step) {
    this.height = images[0].height;
    this.images = images;
    this.step = step == null ? this.getRandomInt(0, images.length) : step;
    this.x = Array.isArray(x) ? this.getRandomInt(x[0], x[1]) : x;
    this.y = Array.isArray(y) ? this.getRandomInt(y[0], y[1]) : y;
    this.lurch = lurch;
    this.steps = steps;
  }
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  getFrame() {
    const frame = {
      image: this.images[this.step],
      x: this.x,
      y: (this.y += this.lurch[this.step]),
    };
    this.x += this.steps[this.step];
    this.step = this.step + 1 >= this.images.length ? 0 : this.step + 1;
    return frame;
  }
  draw(context) {
    const frame = this.getFrame();
    context.drawImage(frame.image, frame.x, frame.y);
  }
}
