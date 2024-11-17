export const drawSquare = (
  pg,
  x,
  y,
  unitWidth,
  unitHeight,
  color,
  stroke = false,
) => {
  if (stroke) {
    pg.strokeWeight(2);
    pg.stroke(51);
  } else {
    pg.noStroke();
  }
  pg.fill(color);
  pg.rect(x, y, unitWidth, unitHeight);
};
