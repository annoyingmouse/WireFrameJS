"use strict";
class Paddle {
    constructor(left) {
        this.width = 10;
        this.x = (left) ? this.width : width - this.width;
        this.y = height / 2;
        this.height = 100;
        this.yChange = 0;
    }

    show() {
        rectMode(CENTER);
        fill(255);
        rect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += this.yChange;
        this.y = constrain(this.y, this.height / 2, height - this.height / 2);
    }

    move(steps) {
        this.yChange = steps;
    }
}