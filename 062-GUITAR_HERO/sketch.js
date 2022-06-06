new p5(p5 => {
  let curTime = Math.floor(Date.now() / 1000)
  let deltaTime = 0
  let startTime = 0
  let score = 0
  const bps = 100.5
  let firstTime = true
  const counters = []
  const shine = [0,0,0,0,0]
  let background = null
  let fade = null
  let shineImage = null
  let themoment = null
  let nightmare = null
  const counterPoints = [
    {position: 2, y: 9.3},
    {position: 0, y: 11.5},
    {position: 3, y: 13.8},
    {position: 1, y: 16.2},
    {position: 2, y: 18.5},
    {position: 0, y: 20.7},
    {position: 2, y: 23},
    {position: 0, y: 25},
    {position: 3, y: 27.6},
    {position: 1, y: 29.8},
    {position: 2, y: 32.1},
    {position: 0, y: 34.5},
    {position: 4, y: 36.6},
    {position: 1, y: 38.9},
    {position: 3, y: 41},
    {position: 1, y: 43.5},
    {position: 2, y: 44.6},
    {position: 3, y: 45.7},
    {position: 0, y: 48},
    {position: 4, y: 50.3},
    {position: 1, y: 52.5},
    {position: 1, y: 53.5},
    {position: 2, y: 53.9},
    {position: 3, y: 54.5},
    {position: 4, y: 54.8},
    {position: 2, y: 57.1},
    {position: 4, y: 59.4},
    {position: 2, y: 61.7},
    {position: 4, y: 64.1},
    {position: 2, y: 66.6},
    {position: 0, y: 69.8},
  ]

  p5.preload = () => {
    p5.soundFormats('mp3', 'ogg');
    themoment = p5.loadSound('music/themoment');
  }

  p5.setup = () => {
    nightmare = p5.loadFont('./fonts/Nightmare_Hero_Normal.ttf')
    p5.createCanvas(800, 600)
    counterPoints.forEach(counterPoint => {
      counters.push({
        image: p5.loadImage(`./images/counter${counterPoint.position}.png`),
        x: 300 + (counterPoint.position * 50),
        y: (counterPoint.y - 9.9) * -50
      })
    })
    background = p5.loadImage(`./images/background.png`)
    fade = p5.loadImage(`./images/fade.png`)
    shineImage = p5.loadImage(`./images/shine.png`)
  }

  p5.draw = () => {
    p5.textFont(nightmare)
    p5.imageMode(p5.CORNER)
    p5.image(background, 0, 0)
    drawCounters()
    p5.image(fade, 0, 0)
    for(let s = 0; s < 5; s++){
      if(shine[s] > 0){
        p5.image(shineImage, 230 + (s * 50), 450)
        shine[s] = shine[s] - 1
      }
    }
    p5.textAlign(p5.CENTER, p5.CENTER)
    p5.textSize(40)
    p5.fill(0, 0, 255)
    p5.drawingContext.shadowBlur = 5
    p5.drawingContext.shadowColor = p5.color(255,255,255)
    p5.text(`SCORE:${score}`, 400, 575)
    if((curTime - startTime) > 70){
      p5.fill(255, 0, 0)
      p5.text(`WELL DONE! YOU ARE A`, 400, 280)
      p5.text(`PYGAME ZERO HERO`, 400, 320)
    }
    update()
  }

  const update = () => {
    if(firstTime === true){
      themoment.play()
      startTime = Math.floor(Date.now() / 1000)
      firstTime = false
    }
    deltaTime = (Math.floor(Date.now() / 1000)) - curTime
    curTime = Math.floor(Date.now() / 1000)
    updateCounters()
  }

  const updateCounters = () => {
    counters.forEach(counter => {
      counter.y = counter.y + (bps/2) *  deltaTime
    })
  }

  p5.keyPressed = () => {
    counters.forEach(counter => {
      console.log(counter.y)
      if (counter.y > 490 && counter.y < 525) {
        if (counter.x === 300 && p5.keyCode === 90) {
          noteCorrect(0)
        }
        if (counter.x === 350 && p5.keyCode === 88) {
          noteCorrect(1)
        }
        if (counter.x === 400 && p5.keyCode === 67) {
          noteCorrect(2)
        }
        if (counter.x === 450 && p5.keyCode === 86) {
          noteCorrect(3)
        }
        if (counter.x === 500 && p5.keyCode === 66) {
          noteCorrect(4)
        }
      }
    })

  }

  const noteCorrect = column => {
    shine[column] = 10
    score = score + 10
  }

  const drawCounters = () => {
    p5.imageMode(p5.CENTER)
    counters.forEach(counter => {
      if(counter.y < 520 && counter.y > -20){
        p5.image(counter.image, counter.x, counter.y);
      }
    })
    p5.imageMode(p5.CORNER)
  }

})