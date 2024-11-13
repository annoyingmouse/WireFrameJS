export default class Layer {
  constructor(p5, top, left, speed, img) {
    this.p5 = p5;
    this.top = top;
    this.left = left;
    this.speed = speed;
    this.img = this.p5.loadImage(img);
  }

  move() {
    this.draw();
    this.left -= this.speed;
    if (this.left <= -Math.abs(p5.width)) {
      this.left = 0;
    }
  }

  draw() {
    this.p5.image(this.img, this.left, this.top);
  }
}
