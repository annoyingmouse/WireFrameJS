export default class Tile {

    constructor(p5, x, y, dimension, row, column) {
        this.p5 = p5;
        this.x = x;
        this.y = y;
        this.dimension = dimension;
        this.row = row;
        this.column = column;
        this.on = p5.color(255, 184, 0);
        this.off = p5.color(26, 17, 16);
        this.radius = Math.sqrt(Math.pow(dimension, 2) * 2)
        this.onFirst = true;
        this.pg = this.p5.createGraphics(dimension, dimension)
        this.pg.noStroke();
    }

    update(){
        if(this.radius < 0){
            this.radius = Math.sqrt(Math.pow(this.dimension, 2) * 2);
            this.onFirst = !this.onFirst
        }
        else{
            this.radius -= 1;
        }
        return this.draw();
    }

    draw() {
        this.pg.fill(this.onFirst ? this.off : this.on);
        this.pg.rect(this.x, this.y, this.dimension, this.dimension);
        this.pg.fill(this.onFirst ? this.on : this.off);
        this.pg.circle(this.x + this.dimension / 2, this.y + this.dimension / 2, this.radius);
        return {
            pg: this.pg,
            x: this.x,
            y: this.y
        }
        //context.image(this.pg, this.x, this.y, this.dimension, this.dimension)
    }

}