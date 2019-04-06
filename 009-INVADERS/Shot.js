export default class Shot {
    constructor(p5, x) {
        this.p5 = p5;
        this.x = x;
        this.y = -70;
        this.matrix = [
            [0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 1, 0]
        ];
        this.width = this.matrix[0].length * 10;
        this.height = this.matrix.length * 10;
        this.impacts = 0;
        this.exploded = false;
    }

    mutableRotateLeft = () => this.matrix.push(this.matrix.shift());

    mutableRotateRight = () => this.matrix.unshift(this.matrix.pop());

    getShrapnel() {
        const shapnel = [];
        this.matrix.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                if (column) {
                    shapnel.push({
                        x: this.x + (columnIndex * 10),
                        y: this.y + (rowIndex * 10)
                    });
                    this.p5.rect(this.x + (columnIndex * 10), this.y + (rowIndex * 10), 10, 10);
                }
            });
        });
        return shapnel;
    }

    impact(num) {
        this.impacts += num;
        return this.impacts;
    }

    explode() {
        this.matrix[0] = [0, 0, 1, 0, 0, 0];
        this.matrix[1] = [1, 0, 0, 0, 1, 0];
        this.matrix[2] = [0, 0, 1, 1, 0, 1];
        this.matrix[3] = [0, 1, 1, 1, 1, 0];
        this.matrix[4] = [1, 0, 1, 1, 1, 0];
        this.matrix[5] = [0, 1, 1, 1, 1, 1];
        this.matrix[6] = [1, 0, 1, 1, 1, 0];
        this.matrix[7] = [0, 1, 0, 1, 0, 1];
        this.exploded = true;
    }

    draw() {
        this.p5.fill(0);
        this.p5.stroke(0);
        this.matrix.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                if (column) {
                    this.p5.rect(this.x + (columnIndex * 10), this.y + (rowIndex * 10), 10, 10);
                }
            });
        });
        this.y += 10;
        this.mutableRotateLeft();
    }

}