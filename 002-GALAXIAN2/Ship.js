export default class Ship {

    constructor(p5, x, y, img, angle) {
        this.p5 = p5
        this.originalX = x
        this.originalY = y
        this.x = x
        this.y = y
        this.img = this.p5.loadImage(img)
        this.angle = angle
        this.right = true
        this.vx = 2
        this.diving = false
        this.flipx = false
        this.t = 0
    }

    getDivePath(){


    }

    dive() {
        this.diving = true
        this.flipx = this.x < (this.p5.width / 2)
        let dir = this.flipx ? -1 : 1
        let sx = this.x
        let sy = this.y
    }

    update() {
        if (this.diving) {
            this.t += 1;
        } else {
            this.x = (this.direction) ? this.x + this.vx : this.x - this.vx
            this.direction = (this.x === this.p5.width - 50 || this.x === 50) ? !this.direction : this.direction
            this.originalX = this.x
            this.originalY = this.y
        }
        if (this.y > this.p5.width) {
            this.diving = false
            this.x = this.originalX
            this.y = this.originalY
            this.angle = 90
        }
        this.draw()
    }

    draw() {
        this.p5.translate(this.x, this.y)
        this.p5.translate(0, 0)
        this.p5.rotate(this.angle)
        this.p5.image(this.img, 0, 0)
    }

}