import { Polygon } from './Polygon.js'
import { DraggablePolygon } from './DraggablePolygon.js';

new p5(p5 => {
  const unit = 40
  const width = 640
  const height = 480
  let button
  const immovable = new Polygon(p5, 'blue', [
    [unit * 2, height - (unit)],
    [unit * 2, height - (unit * 3)],
    [unit * 3, height - (unit * 6)],
    [unit * 6, height - (unit * 7)],
    [unit * 8, height - (unit * 7)],
    [unit * 8, height - (unit)],
    [unit * 2, height - (unit)]
  ], false, false)
  const movable = new DraggablePolygon(p5, 'red', [
    [unit * 10, height - (unit * 5)],
    [unit * 10, height - (unit * 6)],
    [unit * 12, height - (unit * 8)],
    [unit * 14, height - (unit * 6)],
    [unit * 14, height - (unit * 5)],
    [unit * 10, height - (unit * 5)]
  ], false, false)

  p5.setup = () => {
    p5.createCanvas(width, height)
    button = p5.createButton('Reset')
    button.mousePressed(reset)
    p5.frameRate(60)
    movable.over()
  }

  function reset() {
    movable.reset([
      [unit * 10, height - (unit * 5)],
      [unit * 10, height - (unit * 6)],
      [unit * 12, height - (unit * 8)],
      [unit * 14, height - (unit * 6)],
      [unit * 14, height - (unit * 5)],
      [unit * 10, height - (unit * 5)]
    ]);
  }

  p5.draw = () => {
    p5.background(128)
    immovable.display()
    movable.over()
    movable.update()
    movable.dragmove(immovable)
    movable.display()
  }

  p5.mousePressed = () => {
    movable.pressed()
  }

  p5.mouseReleased = () => {
    movable.released()
  }
})