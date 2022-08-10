import { Polygon } from './Polygon.js'

export class DraggablePolygon extends Polygon{
  /*
   * Adapted from Draggable (https://editor.p5js.org/codingtrain/sketches/U0R5B6Z88)
   */
  constructor(p5, colour, vertices){
    super(p5, colour, vertices)
    this.dragging = false
    this.rollover = false
    this.snapped = false
  }

  reset(nVertices) {
    this.vertices = nVertices
    this.midpoints = nVertices.reduce((previousValue, element, index, array) => {
      if(index < array.length - 1){
        previousValue.push([(element[0] + array[index + 1][0]) / 2, (element[1] + array[index + 1][1]) / 2 ])
      }
      return previousValue
    }, [])
    this.snapped = false
  }

  over() {
    // stolen from https://github.com/substack/point-in-polygon
    const x = this.p5.mouseX
    const y = this.p5.mouseY
    let inside = false
    for(let i = 0, j = this.vertices.length - 1; i < this.vertices.length; j = i++){
      const xi = this.vertices[i][0]
      const yi = this.vertices[i][1]
      const xj = this.vertices[j][0]
      const yj = this.vertices[j][1]
      const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
      if(intersect) inside = !inside
      this.rollover = inside
    }
  }

  update() {
    if(this.dragging) {
      this.vertices.forEach((element, index) => {
        this.vertices[index][0] = this.p5.mouseX + this.vOffsets[index][0];
        this.vertices[index][1] = this.p5.mouseY + this.vOffsets[index][1];
      }, this.vertices);
      this.midpoints.forEach((element, index) => {
        this.midpoints[index][0] = this.p5.mouseX + this.mpOffsets[index][0];
        this.midpoints[index][1] = this.p5.mouseY + this.mpOffsets[index][1];
      }, this.midpoints);
    }
  }

  pressed() {
    if(this.rollover && !this.snapped){
      this.dragging = true
      this.vOffsets = this.vertices.map(vertex => {
        return [
          vertex[0] - this.p5.mouseX,
          vertex[1] - this.p5.mouseY
        ]
      })
      this.mpOffsets = this.midpoints.map(midpoint => {
        return [
          midpoint[0] - this.p5.mouseX,
          midpoint[1] - this.p5.mouseY
        ]
      })
    }
  }

  snap(source, end){
    const moveX = source[0] - end[0]
    const moveY = source[1] - end[1]
    this.vertices.forEach((element, index) => {
      this.vertices[index][0] += moveX
      this.vertices[index][1] += moveY
    }, this.vertices);
    this.midpoints.forEach((element, index) => {
      this.midpoints[index][0] += moveX
      this.midpoints[index][1] += moveY
    }, this.midpoints);
    this.snapped = true
  }

  observe(target) {
    let rule1 = false
    let rule2 = false
    let abort = false
    for(let i = 0; i < target.vertices.length && !abort; i++){
      for(let j = 0; j < this.vertices.length && !abort; j++){
        const distance = Math.sqrt(Math.pow((target.vertices[i][0] - this.vertices[j][0]), 2) + Math.pow((target.vertices[i][1] - this.vertices[j][1]), 2))
        if(distance <= 20){
          this.snap([...target.vertices[i]], [...this.vertices[j]])
          this.dragging = false
          abort = true
          rule1 = true
        }
      }
    }
    if(!rule1){
      for(let i = 0; i < target.midpoints.length && !abort; i++){
        for(let j = 0; j < this.vertices.length && !abort; j++){
          const distance = Math.sqrt(Math.pow((target.midpoints[i][0] - this.vertices[j][0]), 2) + Math.pow((target.midpoints[i][1] - this.vertices[j][1]), 2))
          if(distance <= 15){
            this.snap([...target.midpoints[i]], [...this.vertices[j]])
            this.dragging = false
            abort = true
            rule2 = true
          }
        }
      }
    }

  }

  released() {
    this.dragging = false;
  }

}