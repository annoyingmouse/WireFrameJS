export default class Tile {

    constructor(p5, x, y, dimension, row, column, initial) {
        this.p5 = p5;
        this.x = x;
        this.y = y;
        this.dimension = dimension;
        this.delay = column;
        this.onFirst = row % 2;
        this.on = p5.color(255, 184, 0);
        this.off = p5.color(26, 17, 16);
        this.initial = initial
        this.diameter = Math.sqrt(Math.pow(dimension, 2) * 2)
        this.pg = p5.createGraphics(dimension, dimension)
        this.pg.noStroke();
    }

    update() {
        if (this.delay === 0) {
            if (this.diameter < 0) {
                this.diameter = Math.sqrt(Math.pow(this.dimension, 2) * 2);
                this.onFirst = !this.onFirst;
                this.delay = this.initial + 100;
            }
            else {
                this.diameter -= 1;
            }
        } else {
            this.delay -= 1;
        }
        return this.draw();
    }

    draw() {
        // https://stackoverflow.com/questions/55971705/issues-with-multiple-p5-image
        this.pg.fill(this.onFirst ? this.off : this.on);
        this.pg.rect(0, 0, this.dimension, this.dimension);
        this.pg.fill(this.onFirst ? this.on : this.off);
        this.pg.circle(this.dimension / 2, this.dimension / 2, this.diameter);
        return this.pg;
    }
}
