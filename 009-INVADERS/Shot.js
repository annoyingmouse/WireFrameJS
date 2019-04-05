export default class Shot{
    constructor(p5, x){
        this.p5 = p5,
        this.x = x,
        this.y = 0,
        this.colour = [255, 255, 255],
        this.matrix = [
            [0,1,0],
            [1,0,0],
            [0,1,0],
            [0,0,1],
            [0,1,0],
            [1,0,0],
            [0,1,0],
            [0,0,1]
        ]
    }

    mutableRotateLeft (arr) {
        arr.push(arr.shift());
        return arr;
      }

    draw() {
        this.p5.fill(0);
        this.p5.stroke(0);        
        this.matrix.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                if(column){
                    this.p5.rect(this.x + (columnIndex * 10), this.y + (rowIndex * 10), 10, 10);
                }
            });
        });
        this.y += 10;
        this.matrix = this.mutableRotateLeft(this.matrix);
    }

}