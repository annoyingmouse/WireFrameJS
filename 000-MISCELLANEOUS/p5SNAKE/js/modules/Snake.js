export default class Snake {
    
    constructor(s, w, h) {
        this.x = 0;
        this.y = 0;
        this.xspeed = 1;
        this.yspeed = 0;
        this.scale = s;
        this.total = 0;
        this.tail = [];
    }

    update(p5) {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }

        if (this.total > 0) {
            this.tail[this.total - 1] = p5.createVector(this.x, this.y);
        }

        this.x = this.x + this.xspeed * this.scale;
        this.y = this.y + this.yspeed * this.scale;

        this.x = p5.constrain(this.x, 0, p5.width - this.scale);
        this.y = p5.constrain(this.y, 0, p5.height - this.scale);
    }

    show(p5) {
        p5.fill(255);
        this.tail.forEach(segment => {
            p5.rect(segment.x, segment.y, this.scale, this.scale);
        });
        p5.rect(this.x, this.y, this.scale, this.scale);
    }

    dir(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }

    eat(pos, p5) {
        if (p5.dist(this.x, this.y, pos.x, pos.y) === 0) {
            this.total++;
            return true;
        } else {
            return false;
        }
    }

    death(p5) {
        this.tail.forEach(segment => {
            if (p5.dist(this.x, this.y, segment.x, segment.y) === 0) {
                this.total = 0;
                this.tail = [];
            }
        })
    }
}