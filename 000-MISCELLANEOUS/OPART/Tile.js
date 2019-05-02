export default class Tile {

    constructor(p5, x, y, width, height, row) {
        this.p5 = p5;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.row = row;
        this.on = p5.color(255, 184, 0);
        this.off = p5.color(26, 17, 16);
        
    }

    update(status) {
        this.draw()
    }

    draw() {
        
    }

}