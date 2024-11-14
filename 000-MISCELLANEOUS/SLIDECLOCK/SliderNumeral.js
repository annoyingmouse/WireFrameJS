export class SliderNumeral {
  constructor(
    p5,
    backGroundColour,
    x,
    y,
    unitWidth,
    unitHeight,
    orange,
    black,
    transparency,
    fast = false,
  ) {
    this.p5 = p5;
    this.backGroundColour = backGroundColour;
    this.x = x;
    this.y = y;
    this.unitWidth = unitWidth;
    this.unitHeight = unitHeight;
    this.orange = orange || "#FF3131";
    this.black = black || "#000000";
    this.transparency = transparency || "#00000000";
    this.pg = p5.createGraphics(unitWidth * 4, unitHeight * 26);
    this.numeralOffset = 8;
    this.firstColumnOffset = 0;
    this.secondColumnOffset = 0;
    this.thirdColumnOffset = 0;
    this.otherColumnsOffset = 0;
    this.instant = fast;
  }

  update(num) {
    const positions = [
      [5, 6, 10, 12], // 0
      [0, 0, 4, 12], // 1
      [7, 11, 3, 10], // 2
      [9, 7, 3, 6], // 3
      [3, 4, 8, 6], // 4
      [11, 9, 3, 8], // 5
      [5, 9, 3, 8], // 6
      [1, 2, 6, 12], // 7
      [5, 1, 3, 12], // 8
      [11, 1, 3, 12], // 9
    ];
    this.pg.clear();
    if (!this.firstColumnOffset !== positions[num][0] * this.unitHeight) {
      if (this.firstColumnOffset < positions[num][0] * this.unitHeight) {
        this.firstColumnOffset = this.instant
          ? Math.abs(
              this.firstColumnOffset - positions[num][0] * this.unitHeight,
            ) < 5
            ? positions[num][0] * this.unitHeight
            : (this.firstColumnOffset += 5)
          : (this.firstColumnOffset += 1);
      } else {
        this.firstColumnOffset = this.instant
          ? Math.abs(
              this.firstColumnOffset - positions[num][0] * this.unitHeight,
            ) < 5
            ? positions[num][0] * this.unitHeight
            : (this.firstColumnOffset -= 5)
          : (this.firstColumnOffset -= 1);
      }
    }
    if (!this.firstColumnOffset !== positions[num][0] * this.unitHeight) {
      if (this.firstColumnOffset < positions[num][0] * this.unitHeight) {
        this.firstColumnOffset = this.instant
          ? Math.abs(
              this.firstColumnOffset - positions[num][0] * this.unitHeight,
            ) < 5
            ? positions[num][0] * this.unitHeight
            : (this.firstColumnOffset += 5)
          : (this.firstColumnOffset += 1);
      } else {
        this.firstColumnOffset = this.instant
          ? Math.abs(
              this.firstColumnOffset - positions[num][0] * this.unitHeight,
            ) < 5
            ? positions[num][0] * this.unitHeight
            : (this.firstColumnOffset -= 5)
          : (this.firstColumnOffset -= 1);
      }
    }
    if (!this.secondColumnOffset !== positions[num][2] * this.unitHeight) {
      if (this.secondColumnOffset < positions[num][2] * this.unitHeight) {
        this.secondColumnOffset = this.instant
          ? Math.abs(
              this.secondColumnOffset - positions[num][2] * this.unitHeight,
            ) < 5
            ? positions[num][2] * this.unitHeight
            : (this.secondColumnOffset += 5)
          : (this.secondColumnOffset += 1);
      } else {
        this.secondColumnOffset = this.instant
          ? Math.abs(
              this.secondColumnOffset - positions[num][2] * this.unitHeight,
            ) < 5
            ? positions[num][2] * this.unitHeight
            : (this.secondColumnOffset -= 5)
          : (this.secondColumnOffset -= 1);
      }
    }
    if (!this.thirdColumnOffset !== positions[num][3] * this.unitHeight) {
      if (this.thirdColumnOffset < positions[num][3] * this.unitHeight) {
        this.thirdColumnOffset = this.instant
          ? Math.abs(
              this.thirdColumnOffset - positions[num][3] * this.unitHeight,
            ) < 5
            ? positions[num][3] * this.unitHeight
            : (this.thirdColumnOffset += 5)
          : (this.thirdColumnOffset += 1);
      } else {
        this.thirdColumnOffset = this.instant
          ? Math.abs(
              this.thirdColumnOffset - positions[num][3] * this.unitHeight,
            ) < 5
            ? positions[num][3] * this.unitHeight
            : (this.thirdColumnOffset -= 5)
          : (this.thirdColumnOffset -= 1);
      }
    }
    if (!this.otherColumnsOffset !== positions[num][1] * this.unitHeight) {
      if (this.otherColumnsOffset < positions[num][1] * this.unitHeight) {
        this.otherColumnsOffset = this.instant
          ? Math.abs(
              this.otherColumnsOffset - positions[num][1] * this.unitHeight,
            ) < 5
            ? positions[num][1] * this.unitHeight
            : (this.otherColumnsOffset += 5)
          : (this.otherColumnsOffset += 1);
      } else {
        this.otherColumnsOffset = this.instant
          ? Math.abs(
              this.otherColumnsOffset - positions[num][1] * this.unitHeight,
            ) < 5
            ? positions[num][1] * this.unitHeight
            : (this.otherColumnsOffset -= 5)
          : (this.otherColumnsOffset -= 1);
      }
    }
    this.draw();
  }

  draw() {
    this.pg.noStroke();
    this.pg.fill(this.backGroundColour);
    this.pg.rect(0, 0, this.unitWidth * 4, this.unitHeight * 24);
    this.figureEight(0, 0, this.unitWidth, this.unitHeight);
    this.firstColumn(0, 0, this.unitWidth, this.unitHeight);
    this.secondColumn(0, 0, this.unitWidth, this.unitHeight);
    this.thirdColumn(0, 0, this.unitWidth, this.unitHeight);
    // this.otherColumns(0, 0, this.unitWidth, this.unitHeight);
    return this.p5.image(this.pg, this.x, this.y);
  }

  drawSquare = (x, y, unitWidth, unitHeight, color, stroke = false) => {
    if (stroke) {
      this.pg.strokeWeight(2);
      this.pg.stroke(51);
    } else {
      this.pg.noStroke();
    }
    this.pg.fill(color);
    this.pg.rect(x, y, unitWidth, unitHeight);
  };

  figureEight = (x, y, unitWidth, unitHeight) => {
    const figure = [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ];
    for (let y = 8; y < figure.length + this.numeralOffset; y++) {
      for (let x = 0; x < figure[y - this.numeralOffset].length; x++) {
        if (figure[y - this.numeralOffset][x] === 1) {
          this.drawSquare(
            (x + 0.5) * unitWidth,
            y * unitHeight,
            unitWidth,
            unitHeight,
            this.orange,
            true,
          );
        }
      }
    }
  };
  firstColumn = (x, y, unitWidth, unitHeight) => {
    const figure = [1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1];
    for (let y = 0; y < figure.length; y++) {
      if (figure[y] === 1) {
        this.drawSquare(
          unitWidth / 2,
          y * unitHeight + this.firstColumnOffset,
          unitWidth,
          unitHeight,
          this.black,
          true,
        );
      } else {
        this.drawSquare(
          unitWidth / 2,
          y * unitHeight + this.firstColumnOffset,
          unitWidth,
          unitHeight,
          this.transparency,
          true,
        );
      }
    }
  };
  secondColumn = (x, y, unitWidth, unitHeight) => {
    const figure = [1, 0, 0, 0, 1, 0, 1, 0, 1];
    for (let y = 0; y < figure.length; y++) {
      if (figure[y] === 1) {
        this.drawSquare(
          (x + 1.5) * unitWidth,
          y * unitHeight + this.secondColumnOffset,
          unitWidth,
          unitHeight,
          this.black,
          true,
        );
      } else {
        this.drawSquare(
          (x + 1.5) * unitWidth,
          y * unitHeight + this.secondColumnOffset,
          unitWidth,
          unitHeight,
          this.transparency,
          true,
        );
      }
    }
  };
  thirdColumn = (x, y, unitWidth, unitHeight) => {
    this.drawSquare(
      (x + 2.5) * unitWidth,
      unitHeight + this.thirdColumnOffset,
      unitWidth,
      unitHeight,
      this.black,
      true,
    );
  };
  otherColumns = (x, y, unitWidth, unitHeight) => {
    const figure = [
      [0, 1],
      [0, 0],
      [0, 0],
      [0, 0],
      [1, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [1, 0],
      [0, 0],
      [1, 0],
      [0, 0],
      [1, 0],
    ];
    for (let y = 0; y < figure.length; y++) {
      for (let x = 0; x < figure[y].length; x++) {
        if (figure[y][x] === 1) {
          this.drawSquare(
            (x + 1.5) * unitWidth,
            y * unitHeight + this.otherColumnsOffset,
            unitWidth,
            unitHeight,
            this.black,
            true,
          );
        } else {
          this.drawSquare(
            (x + 1.5) * unitWidth,
            y * unitHeight + this.otherColumnsOffset,
            unitWidth,
            unitHeight,
            this.transparency,
            true,
          );
        }
      }
    }
  };
}
