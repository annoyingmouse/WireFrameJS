new p5(p5 => {

  const skater = {
    image: null,
    images: [],
    x: 700,
    y: 230,
    direction: 'l',
    speed: 0,
    switch: 0,
  }
  const skaterImages = ['skaterl', 'skaterr', 'fallenl', 'fallenr']

  const score = 0
  let halfpipe
  let background = {
    image: null,
    x: 0,
    y: 0
  }

  let skaterdudes

  p5.preload = () => {
    halfpipe = p5.loadImage(`./images/halfpipe.png`)
    background.image = p5.loadImage(`./images/background.png`)
    skater.image = p5.loadImage(`./images/skaterl.png`)
    skaterImages.forEach(skaterImage => {
      skater.images[skaterImage] = p5.loadImage(`./images/${skaterImage}.png`)
    })
    skaterdudes = p5.loadFont('./fonts/SKATERDUDES.ttf')
  }

  p5.setup = () => {
    p5.createCanvas(800, 600)
    p5.textFont(skaterdudes);
  }

  p5.draw = () => {
    p5.imageMode(p5.CORNER)
    p5.image(background.image, background.x, background.y)

    p5.textSize(50)
    p5.fill(255, 255, 255)
    p5.drawingContext.shadowBlur = 5
    p5.drawingContext.shadowColor = p5.color(255, 0, 0)
    p5.textAlign(p5.CENTER, p5.TOP);
    p5.text(`SKATE OR DIE`, 0, 10, 800)
    p5.drawingContext.shadowBlur = 0
    p5.textSize(38)
    p5.fill(255, 255, 255)
    p5.text(`SCORE: ${score}`, 0, 70, 800)
    update()
  }

  const update = () => {

  }

  p5.keyPressed = () => {

  }

  const limit = (num, min, max) => Math.min(Math.max(num, min), max)


  const touching = (firstObjectOrArray, secondObjectOrArray) => {
    /*
     * Adapted from:
     * https://stackoverflow.com/questions/16005136/how-do-i-see-if-two-rectangles-intersect-in-javascript-or-pseudocode#answer-54323789
     * If an array, then values should be top, right, bottom, left (like CSS)
     */
    const firstRectangle = {
      left: Array.isArray(firstObjectOrArray)
          ? firstObjectOrArray[3]
          : firstObjectOrArray.x - (firstObjectOrArray.image.width / 2),
      top: Array.isArray(firstObjectOrArray)
          ? firstObjectOrArray[0]
          : (firstObjectOrArray.y - (firstObjectOrArray.image.height / 2)) + firstObjectOrArray.image.height,
      right: Array.isArray(firstObjectOrArray)
          ? firstObjectOrArray[1]
          : (firstObjectOrArray.x - (firstObjectOrArray.image.width / 2)) + firstObjectOrArray.image.width,
      bottom: Array.isArray(firstObjectOrArray)
          ? firstObjectOrArray[2]
          : firstObjectOrArray.y - (firstObjectOrArray.image.height / 2)
    }
    const secondRectangle = {
      left: Array.isArray(secondObjectOrArray)
          ? secondObjectOrArray[3]
          : secondObjectOrArray.x - (secondObjectOrArray.image.width / 2),
      top: Array.isArray(secondObjectOrArray)
          ? secondObjectOrArray[0]
          : (secondObjectOrArray.y - (secondObjectOrArray.image.height / 2)) + secondObjectOrArray.image.height,
      right: Array.isArray(secondObjectOrArray)
          ? secondObjectOrArray[1]
          : (secondObjectOrArray.x - (secondObjectOrArray.image.width / 2)) + secondObjectOrArray.image.width,
      bottom: Array.isArray(secondObjectOrArray)
          ? secondObjectOrArray[2]
          : secondObjectOrArray.y - (secondObjectOrArray.image.height / 2)
    }
    // The first rectangle is under the second or vice versa
    if (
        firstRectangle.top <= secondRectangle.bottom
        ||
        secondRectangle.top <= firstRectangle.bottom
    ) {
      return false
    }

    // The first rectangle is to the left of the second or vice versa
    if (
        firstRectangle.right <= secondRectangle.left
        ||
        secondRectangle.right <= firstRectangle.left
    ) {
      return false
    }
    // Rectangles overlap
    return true;
  }


})