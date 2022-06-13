new p5(p5 => {

  const skater = {
    image: null,
    images: [],
    x: 700,
    y: 230,
    xOffset: 40,
    yOffset: 46,
    direction: 'l',
    speed: 0,
    switch: 0,
  }
  const skaterImages = ['skaterl', 'skaterr', 'fallenl', 'fallenr']

  let score = 0
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
    p5.angleMode(p5.DEGREES)
  }

  p5.draw = () => {
    p5.imageMode(p5.CORNER)
    p5.image(background.image, background.x, background.y)
    p5.imageMode(p5.CENTER)

    p5.push()
    p5.translate(skater.x, skater.y);
    p5.imageMode(p5.CENTER);
    p5.rotate(-skater.angle)
    p5.image(skater.image, 0, 0)
    p5.pop()



    p5.textSize(50)
    p5.fill(255, 255, 255)
    p5.drawingContext.shadowBlur = 10
    p5.drawingContext.shadowColor = p5.color(255, 0, 0)
    p5.textAlign(p5.CENTER, p5.TOP);
    p5.text(`SKATE OR DIE`, 0, 10, 800)
    p5.drawingContext.shadowBlur = 10
    p5.drawingContext.shadowColor = p5.color(0, 0, 0)
    p5.textSize(38)
    p5.fill(255, 255, 255)
    p5.text(`SCORE: ${score}`, 0, 70, 800)
    update()
  }

  const update = () => {
    if(skater.y < 600){
      if(p5.keyIsDown(37) && skater.angle  > -20 && skater.speed <= 0){
        skater.speed = limit(skater.speed - 0.2, -13, 0)
        skater.y -= 0.2
      }
      if(p5.keyIsDown(39) && skater.angle < 20 && skater.speed >= 0){
        skater.speed = limit(skater.speed + 0.2, 0, 13)
        skater.y -= 0.2
      }
      const pixel = halfpipe.get(Math.round(skater.x), Math.round(skater.y)).slice(0, 3)
      if (skater.switch > 0){
        skater.switch -= 1
        let angle = skater.angle
        if(skater.switch === 30){
          if(skater.direction === 'l'){
            skater.direction = 'r'
            skater.speed = 1
            skater.angle = -90
          }else{
            skater.direction = 'l'
            skater.speed = -1
            angle = -90
          }
          skater.image = skater.images[`skater${skater.direction}`]
        }
        skater.angle = angle
        if(skater.switch > 30){
          if(skater.direction === 'l'){
            skater.x += 0.6
          }
          else{
            skater.x -= -.6
          }
          skater.y -= 4
        }else{
          skater.y += 3
        }
      }else{
        skater.x = limit(skater.x + skater.speed,20,780)
        if (skater.x <= 20 || skater.x >=780 && skater.speed > 0){
          skater.speed = 0
          if(skater.x <= 20){
            skater.direction = 'r'
          }else{
            skater.direction = 'l'
          }
          skater.image = skater.images[`skater${skater.direction}`]
        }
        const offset = (skater.x > 400) ? 255 - pixel[2] : pixel[2] - 255
        skater.angle = offset / 3
        const yinc = offset * (-skater.speed) / 100
        skater.y += yinc
        skater.speed -= (skater.angle/100)
        skater.speed = skater.speed/1.005
      }
    }else{
      skater.image = skater.images[`fallen${skater.direction}`]
    }
  }

  p5.keyPressed = () => {
    if (p5.keyCode === p5.UP_ARROW) {
      if ((skater.angle > 75 && skater.speed > 0) || (skater.angle < -75 && skater.speed < 0)){
        skater.speed = 0
        skater.switch = 60
        score += 1000
      }
    }
    if (p5.keyCode === 32) {
      skater.direction = "l"
      skater.speed = 0
      skater.x = 720
      skater.y = 230
      skater.image = skater.images['skaterl']
      skater.angle = 0
      skater.switch = 15
      score = 0
    }
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