export class Polygon {
  constructor(p5, colour, vertices){
    this.p5 = p5
    this.colour = colour
    this.vertices = vertices
    this.midpoints = vertices.reduce((previousValue, element, index, array) => {
      if(index < array.length - 1){
        previousValue.push([(element[0] + array[index + 1][0]) / 2, (element[1] + array[index + 1][1]) / 2 ])
      }
      return previousValue
    }, [])
  }

  display() {
    this.p5.fill(this.colour)
    this.p5.strokeWeight(0);
    this.p5.beginShape()
    this.vertices.forEach(vertex => this.p5.vertex(...vertex))
    this.p5.endShape(p5.CLOSE)
    this.p5.beginShape()
    this.p5.fill('black')
    this.vertices.forEach(vertex => this.p5.ellipse(...vertex, 12, 12))
    this.midpoints.forEach(midpoint => this.p5.ellipse(...midpoint, 6, 6))
  }
}