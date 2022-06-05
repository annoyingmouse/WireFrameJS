new p5(p5 => {
  let count = 0
  let catcherPos = 0
  let moveCatcher = 0
  let gameState = 0
  let score = 0
  const catchers = []
  const jumpers = []
  let background = null
  let jumperDropped = null
  let jumperImages = []
  let pinscher
  const jumperPositions = [
    {x: 130,y: 220},
    {x: 190,y: 260},
    {x: 210,y: 320},
    {x: 220,y: 360},
    {x: 240,y: 410},
    {x: 260,y: 360},
    {x: 270,y: 320},
    {x: 290,y: 250},
    {x: 320,y: 220},
    {x: 340,y: 250},
    {x: 360,y: 300},
    {x: 380,y: 360},
    {x: 390,y: 410},
    {x: 420,y: 360},
    {x: 430,y: 300},
    {x: 470,y: 250},
    {x: 500,y: 300},
    {x: 520,y: 360},
    {x: 538,y: 410},
    {x: 580,y: 360},
    {x: 600,y: 320},
    {x: 620,y: 350}
  ]

  p5.setup = () => {
    pinscher = p5.loadFont('./fonts/SHPinscher-Regular.otf')
    p5.createCanvas(800, 600)
    p5.frameRate(60)
    for (let i = 0; i < 3; i++) {
      catchers.push({
        image: p5.loadImage(`./images/catcher${i}.png`),
        x: 240+ (i * 150),
        y: 425,
        active: false
      })
    }
    for (let c = 0; c < 21; c++) {
      jumperImages.push(p5.loadImage(`./images/jumper${c}.png`))
    }
    background = p5.loadImage(`./images/background.png`)
    jumperDropped = p5.loadImage(`./images/jumperdropped.png`)
  }
  p5.draw = () => {
    p5.imageMode(p5.CORNER)
    p5.image(background, 0, 0)
    p5.imageMode(p5.CENTER)
    catchers.forEach((catcher, index) => {
      catcher.active = false
      if(catcherPos === index){
        p5.image(catcher.image, catcher.x, catcher.y);
        catcher.active = true
      }
    })
    jumpers.forEach(jumper => {
      if(jumper.state === 0 && jumper.frame < 21){
        p5.image(jumper.image, jumper.x, jumper.y);
      }
      if(jumper.state === -1 && count % 2 === 0){
        p5.image(jumper.image, jumper.x, jumper.y);
      }
    })
    p5.textFont(pinscher);
    p5.textSize(25);
    p5.text(`SAVED: ${score}`, 580, 120);
    if(count === 0) {
      makeJumper()
    }
    update()
  }

  const update = () => {
    count += 1
    if(count % 30 === 0){
      doUpdate()
    }
    if(count % 2000 === 0){
      makeJumper()
    }
  }

  p5.keyPressed = () => {
    if (p5.keyCode === p5.LEFT_ARROW) {
      if(!catchers[0].active){
        moveCatcher = -1
      }
    } else if (p5.keyCode === p5.RIGHT_ARROW) {
      if(!catchers[2].active){
        moveCatcher = 1
      }
    }
  }

  const limit = (num, min, max) => Math.min(Math.max(num, min), max)

  const doUpdate = () => {

      catcherPos = limit(catcherPos + moveCatcher, 0, 2)
      moveCatcher = 0
      jumpers.forEach((jumper, index) => {
        if(jumper.frame < 21 && jumper.state === 0){
          jumper.frame = jumper.frame + 1
          jumper.image = jumperImages[jumper.frame]
          jumper.x = jumperPositions[jumper.frame].x
          jumper.y = jumperPositions[jumper.frame].y
        } else {
          if(jumper.state === 0) {
            jumper.state = 1
            jumpers.splice(index, 1)
            score = score + 1
            makeJumper()
          }
          if(jumper.state === -1) {
            jumpers.splice(index, 1)
            makeJumper()
          }
        }
        if((jumper.frame === 4 && catcherPos !== 0) || (jumper.frame === 12 && catcherPos !== 1) || (jumper.frame === 18 && catcherPos !== 2)){
          console.log('Do stuff')
          jumper.state = -1
          jumper.image = jumperDropped
          jumper.y += 50
          gameState = 1
        }
      })

  }
  const makeJumper = () => {
    if(jumpers.length % 5 === 0){
      jumpers.push({
        image: jumperImages[0],
        x: 130,
        y: 270,
        frame: 0,
        state: 0
      })
      jumpers[jumpers.length - 1].frame = 1
    }else{
      jumpers.push({
        image: jumperImages[0],
        x: 130,
        y: 220,
        frame: 0,
        state: 0
      })
      jumpers[jumpers.length - 1].frame = 0
    }
    jumpers[jumpers.length - 1].frame = 0
  }
})