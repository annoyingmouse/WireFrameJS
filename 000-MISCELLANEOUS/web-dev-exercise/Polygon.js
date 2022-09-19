export class Polygon {
  constructor(p5, colour, vertices, drawLines = false, drawBoundingBox = false){
    this.p5 = p5
    this.colour = colour
    this.vertices = vertices
    this.drawLines = drawLines
    this.drawBoundingBox = drawBoundingBox
    this.midpoints = vertices.reduce((previousValue, element, index, array) => {
      if(index < array.length - 1){
        previousValue.push([(element[0] + array[index + 1][0]) / 2, (element[1] + array[index + 1][1]) / 2 ])
      }
      return previousValue
    }, [])
    this.lines = vertices.reduce((previousValue, element, index, array) => {
      if(index < array.length - 1){
        previousValue.push([element[0], element[1], array[index + 1][0], array[index + 1][1]])
      }
      return previousValue
    }, [])
    this.bb = this.calculateBoundingBox(vertices)
  }

  calculateBoundingBox(vertices) {
    const Xs = vertices.map(vertex => vertex[0])
    const Ys = vertices.map(vertex => vertex[1])
    return {
      x: Math.min(...Xs),
      y: Math.min(...Ys),
      width: Math.max(...Xs) - Math.min(...Xs),
      height: Math.max(...Ys) - Math.min(...Ys)
    }
  }

  display() {
    this.p5.fill(this.colour)
    this.p5.strokeWeight(0)
    this.p5.beginShape()
    this.vertices.forEach(vertex => this.p5.vertex(...vertex))
    this.p5.endShape(p5.CLOSE)
    this.p5.beginShape()
    this.p5.fill('black')

    if(this.drawLines) {
      this.p5.stroke(255)
      this.p5.strokeWeight(1)
      this.lines.forEach(line => this.p5.line(...line))
    }

    /*
     * Helper - shows bounding box as well as each line on the bounding box in a different colour.
     */
    if(this.drawBoundingBox) {
      this.p5.stroke(0)
      this.p5.strokeWeight(1)
      this.p5.noFill()
      this.p5.rect(
        this.bb.x,
        this.bb.y,
        this.bb.width,
        this.bb.height
      )
      this.p5.strokeWeight(2)
      this.p5.stroke('red')
      this.p5.line(this.bb.x, this.bb.y, this.bb.x + this.bb.width, this.bb.y) // top
      this.p5.stroke('green')
      this.p5.line(this.bb.x, this.bb.y + this.bb.height, this.bb.x + this.bb.width, this.bb.y + this.bb.height) // bottom
      this.p5.stroke('purple')
      this.p5.line(this.bb.x, this.bb.y, this.bb.x, this.bb.y + this.bb.height) // left
      this.p5.stroke('yellow')
      this.p5.line(this.bb.x + this.bb.width, this.bb.y, this.bb.x + this.bb.width, this.bb.y + this.bb.height) // right
    }

    this.p5.strokeWeight(0)
    this.p5.fill('black')
    this.vertices.forEach(vertex => this.p5.ellipse(...vertex, 12, 12))
    this.midpoints.forEach(midpoint => this.p5.ellipse(...midpoint, 6, 6))
  }

}