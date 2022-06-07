new p5(p5 => {
  const link = {
    images: [],
    x: 400,
    y: 400,
    frame: 0,
    movex: 0,
    movey: 0,
    dir: 0,
    testx: 0,
    testy: 0
  }
  const sword = {
    images: [],
    x: 400,
    y: 400,
    frame: 0,
    dir: 0
  }
  const myDirs = [
    [0,1],
    [-1,0],
    [0,-1],
    [1,0]
  ]
  const monstersXY = [
    {x: 1325,y: 375},
    {x: 1025,y: -225},
    {x: 300,y: -225},
    {x: 1925,y: -225},
    {x: 1925,y: 375}
  ]
  const monsters = monstersXY.map(position => {
    return {
      images: [],
      x: position.x,
      y: position.y,
      state: 10,
      frame: 0,
      movex: 0,
      movey: 0,
      dir: 0,
      testx: 0,
      testy: 0
    }
  })





  p5.setup = () => {
    for(let i = 0; i < 8; i++){
      link.images.push({image: p5.loadImage(`./images/link_${i + 1}.png`)})
    }
    for(let i = 0; i < 4; i++){
      sword.images.push({image: p5.loadImage(`./images/sword_${i}.png`)})
    }
    monsters.forEach(monster => {
      for(let i = 0; i < 8; i++){
        link.images.push({image: p5.loadImage(`./images/monster_${i + 1}.png`)})
        link.images.push({image: p5.loadImage(`./images/monster_${i + 1}.png`)})
      }
    })

  }
  p5.draw = () => {
    console.log(monsters)
    // p5.imageMode(p5.CORNER)
    // p5.image(background, 0, 0)
    // p5.imageMode(p5.CENTER)
    // catchers.forEach((catcher, index) => {
    //   catcher.active = false
    //   if(catcherPos === index){
    //     p5.image(catcher.image, catcher.x, catcher.y);
    //     catcher.active = true
    //   }
    // })
    // jumpers.forEach(jumper => {
    //   if(jumper.state === 0 && jumper.frame < 21){
    //     p5.image(jumper.image, jumper.x, jumper.y);
    //   }
    //   if(jumper.state === -1 && count % 2 === 0){
    //     p5.image(jumper.image, jumper.x, jumper.y);
    //   }
    // })
    // p5.textFont(pinscher);
    // p5.textSize(25);
    // p5.text(`SAVED: ${score}`, 580, 120);
    // if(count === 0) {
    //   makeJumper()
    // }
    // update()
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