export default class Ship {
  constructor(p5, x, y, img) {
    this.p5 = p5;
    this.x = x;
    this.y = y;
    this.image = this.p5.loadImage(img)
  }


  draw () {
    this.p5.image(this.image, this.x, this.y);
  }
}