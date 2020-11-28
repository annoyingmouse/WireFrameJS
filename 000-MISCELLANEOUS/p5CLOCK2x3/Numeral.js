import { Clock } from "./Clock.js"

export class Numeral {

  constructor(p5, x, y, unitWidth = 30, degreeMuliplier = 5) {
    this.num = 0
    this.p5 = p5
    this.x = x
    this.y = y
    this.unitWidth = unitWidth
    this.degreeMuliplier = degreeMuliplier
    this.Clocks = [
      new Clock(p5, x, y, unitWidth, degreeMuliplier),
      new Clock(p5, x + unitWidth, y, unitWidth, degreeMuliplier),
      new Clock(p5, x, y + unitWidth, unitWidth, degreeMuliplier),
      new Clock(p5, x + unitWidth, y + unitWidth, unitWidth, degreeMuliplier),
      new Clock(p5, x, y + (unitWidth * 2), unitWidth, degreeMuliplier),
      new Clock(p5, x + unitWidth, y + (unitWidth * 2), unitWidth, degreeMuliplier)
    ]
    this.Numbers = [
      [[2,4],[4,6],[0,4],[0,4],[0,2],[0,6]],
      [[5,5],[4,4],[5,5],[0,4],[5,5],[0,0]],
      [[2,2],[4,6],[2,4],[0,6],[0,2],[6,6]],
      [[2,2],[4,6],[2,2],[0,6],[2,2],[0,6]],
      [[4,4],[4,4],[0,2],[0,4],[5,5],[0,0]],
      [[2,4],[6,6],[0,2],[4,6],[2,2],[0,6]],
      [[2,4],[6,6],[0,4],[4,6],[0,2],[0,6]],
      [[2,2],[4,6],[5,5],[0,4],[5,5],[0,0]],
      [[2,4],[4,6],[0,2],[0,6],[0,2],[0,6]],
      [[2,4],[4,6],[0,2],[0,4],[2,2],[0,6]]
    ]
  }

  draw(){
    this.Clocks.forEach((c, i) => this.p5.image(c.update(...this.Numbers[this.num][i].map(e => e * this.degreeMuliplier)), c.x, c.y))
  }
}