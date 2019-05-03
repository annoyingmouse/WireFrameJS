export default class Tile {

    constructor(p5, x, y, width, height, row, column) {
        this.p5 = p5;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.row = row;
        this.column = column;
        this.on = p5.color(255, 184, 0);
        this.off = p5.color(26, 17, 16);
        this.radiusX = width;
        this.radiusY = height;
    }

    update(status) {
        this.draw()
    }

    isOdd = (num) => num % 2

    draw() {
        let pg = this.p5.createGraphics(this.width, this.height);
        pg.noStroke();
        pg.fill(this.off);
        pg.rect(this.x, this.y, this.width, this.height);
        pg.fill(this.on);
        pg.circle(this.x + pg.width / 2, this.y + pg.height / 2, this.radius);
        return {
            i: pg,
            x: this.x,
            y: this.y
        };
        this.radius -= 1;
    }

}