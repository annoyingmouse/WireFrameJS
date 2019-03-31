export default class Player {
    constructor(p5, x, y, platforms) {
        this.p5 = p5;
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
    }

    //if () {

    move(obj) {
        this.x = obj.x;
        this.y = obj.y;
    }
    draw() {
        this.p5.fill(255, 204, 0);
        this.p5.rect(this.x, this.y, this.width, this.height);
    }

}