import { Slider } from "./Slider.js";
import { drawSquare } from "./drawSquare.js";
import { figureEight } from "./figureEight.js";

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
    this.pg = p5.createGraphics(unitWidth * 4, unitHeight * 5);
    this.sliders = [];
    this.sliders.push(
      new Slider(p5, 0, 0, unitWidth, unitHeight, "#FFFFFF", [
        [1, 1], // 0 -> DEFAULT
        [1, 0], // 1 -> Move up
        [1, 1], // 2 -> DEFAULT
        [1, 1], // 3 -> DEFAULT
        [1, 0], // 4 -> Move up
        [1, 1], // 5 -> DEFAULT
        [1, 1], // 6 -> DEFAULT
        [1, 1], // 7 -> DEFAULT
        [1, 1], // 8 -> DEFAULT
        [1, 1], // 9
      ]),
    );
    this.sliders.push(
      new Slider(p5, 0, 0, unitWidth, unitHeight, "#FFFFFF", [
        [1, 1], // 0 -> DEFAULT
        [0, 0], // 1 -> Move up and left
        [1, 1], // 2 -> DEFAULT
        [1, 1], // 3 -> DEFAULT
        [1, 1], // 4 -> DEFAULT
        [1, 1], // 5 -> DEFAULT
        [1, 1], // 6 -> DEFAULT
        [0, 1], // 7 -> DEFAULT
        [1, 1], // 8 -> DEFAULT
        [1, 1], // 9
      ]),
    );
    this.sliders.push(
      new Slider(p5, 0, 0, unitWidth, unitHeight, "#FFFFFF", [
        [1, 1], // 0 -> DEFAULT
        [0, 1], // 1 -> Move left
        [0, 1], // 2 -> Stay still
        [0, 1], // 3 -> Stay still
        [1, 1], // 4 -> DEFAULT
        [2, 1], // 5 -> Move right
        [2, 1], // 6 -> Stay still
        [1, 1], // 7 -> Move left
        [1, 1], // 8 -> DEFAULT
        [1, 1], // 9
      ]),
    );
    this.sliders.push(
      new Slider(p5, 0, 0, unitWidth, unitHeight, "#FFFFFF", [
        [1, 2], // 0 -> Move down
        [1, 2], // 1 -> Stay still
        [1, 1], // 2 -> DEFAULT
        [1, 1], // 3 -> DEFAULT
        [1, 1], // 4 -> DEFAULT
        [1, 1], // 5 -> DEFAULT
        [1, 1], // 6 -> DEFAULT
        [1, 2], // 7 -> Move down
        [1, 1], // 8 -> DEFAULT
        [1, 1], // 9
      ]),
    );

    this.sliders.push(
      new Slider(p5, 0, 0, unitWidth, unitHeight, "#FFFFFF", [
        [1, 3], // 0 -> DEFAULT
        [0, 2], // 1 -> Move up and left
        [1, 3], // 2 -> DEFAULT
        [0, 3], // 3 -> Move left
        [1, 3], // 4 -> DEFAULT
        [0, 3], // 5 -> Move left
        [1, 3], // 6 -> DEFAULT
        [0, 2], // 7 -> Move up and left
        [1, 3], // 8 -> DEFAULT
        [1, 3], // 9
      ]),
    );
    this.sliders.push(
      new Slider(p5, 0, 0, unitWidth, unitHeight, "#FFFFFF", [
        [1, 3], // 0 -> DEFAULT
        [0, 3], // 1 -> Move left
        [1, 3], // 2 -> DEFAULT
        [1, 3], // 3 -> DEFAULT
        [0, 3], // 4 -> Move left
        [1, 3], // 5 -> DEFAULT
        [1, 3], // 6 -> DEFAULT
        [0, 3], // 7 -> Move left
        [1, 3], // 8 -> DEFAULT
        [1, 3], // 9
      ]),
    );
    this.sliders.push(
      new Slider(p5, 0, 0, unitWidth, unitHeight, "#FFFFFF", [
        [1, 3], // 0 -> DEFAULT
        [0, 4], // 1 -> Move down and left
        [1, 3], // 2 -> DEFAULT
        [1, 3], // 3 -> DEFAULT
        [0, 4], // 4 -> Move down and left
        [1, 3], // 5 -> DEFAULT
        [1, 3], // 6 -> DEFAULT
        [0, 4], // 7 -> Move down and left
        [1, 3], // 8 -> DEFAULT
        [0, 3], // 4 -> Move down and left
      ]),
    );
    this.sliders.push(
      new Slider(p5, 0, 0, unitWidth, unitHeight, "#FFFFFF", [
        [1, 3], // 0 -> DEFAULT
        [1, 4], // 1 -> Move down
        [2, 3], // 2 -> Move up and right
        [1, 3], // 3 -> DEFAULT
        [1, 4], // 4 -> Move down
        [1, 3], // 5 -> DEFAULT
        [1, 3], // 6 -> DEFAULT
        [1, 4], // 7 -> Move down
        [1, 3], // 8 -> DEFAULT
        [1, 3], // 9
      ]),
    );
  }

  update(num) {
    this.sliders.forEach((slider) => {
      slider.update(num);
    });
    this.draw();
  }

  draw() {
    this.pg.noStroke();
    this.pg.fill(this.backGroundColour);
    this.pg.rect(0, 0, this.unitWidth * 3, this.unitHeight * 5);
    figureEight(this.pg, 0, 0, this.unitWidth, this.unitHeight, this.orange);
    this.sliders.forEach((slider) => {
      drawSquare(
        this.pg,
        slider.x,
        slider.y,
        this.unitWidth,
        this.unitHeight,
        this.black,
        true,
      );
    });
    return this.p5.image(this.pg, this.x, this.y);
  }
}
