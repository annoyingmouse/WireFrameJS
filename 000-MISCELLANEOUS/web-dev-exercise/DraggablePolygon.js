import { Polygon } from './Polygon.js'

export class DraggablePolygon extends Polygon{
  /*
   * Adapted from Draggable (https://editor.p5js.org/codingtrain/sketches/U0R5B6Z88)
   */
  constructor(p5, colour, vertices, drawLines, drawBoundingBox){
    super(p5, colour, vertices, drawLines, drawBoundingBox)
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
    this.bb = this.calculateBoundingBox(nVertices)
    this.snapped = false
  }

  over() {
    // https://github.com/substack/point-in-polygon
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
      this.bb = this.calculateBoundingBox(this.vertices)
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
    this.bb = this.calculateBoundingBox(this.vertices)
    this.snapped = true
  }

  pDistance(x, y, x1, y1, x2, y2) {
    // https://stackoverflow.com/a/6853926/592058
    const A = x - x1
    const B = y - y1
    const C = x2 - x1
    const D = y2 - y1
    const dot = A * C + B * D
    const len_sq = C * C + D * D
    const param = (len_sq !== 0) ? dot / len_sq : -1
    const xx = (param < 0) ? x1 : (param > 1) ? x2 : x1 + param * C
    const yy = (param < 0) ? y1 : (param > 1) ? y2 : y1 + param * D
    const dx = x - xx
    const dy = y - yy
    return {
      distance: Math.sqrt(dx * dx + dy * dy),
      pointX: dx,
      pointY: dy
    }
  }

  checkVertices(target) {
    for(let i = 0; i < target.vertices.length; i++){
      for(let j = 0; j < this.vertices.length; j++){
        const distance = Math.sqrt(Math.pow((target.vertices[i][0] - this.vertices[j][0]), 2) + Math.pow((target.vertices[i][1] - this.vertices[j][1]), 2))
        if(distance <= 20){
          return {
            targetNode: [...target.vertices[i]],
            sourceNode: [...this.vertices[j]]
          }
        }
      }
    }
  }

  checkMidpoints(target) {
    for(let i = 0; i < target.midpoints.length; i++){
      for(let j = 0; j < this.vertices.length; j++){
        const distance = Math.sqrt(Math.pow((target.midpoints[i][0] - this.vertices[j][0]), 2) + Math.pow((target.midpoints[i][1] - this.vertices[j][1]), 2))
        if(distance <= 15){
          return {
            targetNode: [...target.midpoints[i]],
            sourceNode: [...this.vertices[j]]
          }
        }
      }
    }
  }

  checkLines(target) {
    for(let i = 0; i < target.lines.length; i++){
      for(let j = 0; j < this.vertices.length; j++){
        const distance = this.pDistance(this.vertices[j][0], this.vertices[j][1], target.lines[i][0], target.lines[i][1], target.lines[i][2], target.lines[i][3])
        if(distance.distance < 10) {
          return {
            targetNode: [this.vertices[j][0] - distance.pointX, this.vertices[j][1] - distance.pointY],
            sourceNode: [...this.vertices[j]]
          }
        }
      }
    }
  }

  observe(target) {
    const checkVertices = this.checkVertices(target)
    if (checkVertices) {
      this.dragging = false
      this.snap(checkVertices.targetNode, checkVertices.sourceNode)
      return
    }
    const checkMidpoints = this.checkMidpoints(target)
    if (checkMidpoints) {
      this.dragging = false
      this.snap(checkMidpoints.targetNode, checkMidpoints.sourceNode)
      return
    }
    const checkLines = this.checkLines(target)
    if (checkLines) {
      this.dragging = false
      this.snap(checkLines.targetNode, checkLines.sourceNode)
      return
    }
  }

  released() {
    this.dragging = false;
  }

}