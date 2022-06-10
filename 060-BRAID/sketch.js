new p5(p5 => {
  const  tim = {
    limages: [null],
    rimages: [null],
    image: null,
    x: 220,
    y: 400,
    dir: "r",
    frame: 1,
    ystore: 0,
    xstore: 0,
    jumping: 0
  }

  let levelx = 0
  let backx = 0
  let count = 0

  let collisionMap
  let backgroundl1
  let backgroundl2

  const gameData = []

  p5.preload = () => {
    tim.image = p5.loadImage(`./images/timl1.png`)
    for(let i = 0; i < 10; i++){
      tim.limages.push(p5.loadImage(`./images/timl${i + 1}.png`))
      tim.rimages.push(p5.loadImage(`./images/timr${i + 1}.png`))
    }
    collisionMap = p5.loadImage(`./images/backgroundcol.png`)
    backgroundl1 = p5.loadImage(`./images/backgroundl1.png`)
    backgroundl2 = p5.loadImage(`./images/backgroundl2.png`)
  }

  p5.setup = () => {
    p5.createCanvas(800, 600)
    p5.textSize(28);
    let color = p5.color(255, 255, 255)
    p5.fill(color)
  }

  p5.draw = () => {
    p5.imageMode(p5.CORNER)
    p5.image(backgroundl1, backx, 0)
    p5.image(backgroundl2, levelx, -50)
    p5.imageMode(p5.CENTER)
    p5.image(tim.image, tim.x, tim.y)
    p5.text(`Game Time: ${Math.floor(count/60)}`, 20, 30);
    update()
  }

  const update = () => {
    count += 1
    if(p5.keyIsDown(8)){
      playGameData()
      tim.image = tim[tim.dir === 'r' ? 'rimages' : 'limages'][tim.frame]
    }else{
      const rgbtop = collisionMap.get(Math.round(tim.x - levelx), Math.round(tim.y + 30)).slice(0, 3)
      const rgbbottom = collisionMap.get(Math.round(tim.x - levelx), Math.round(tim.y + 50)).slice(0, 3)
      tim.ystore = tim.y
      tim.xstore = tim.x
      if(p5.keyIsDown(37)){
        if (levelx < 0 && checkMove(-2)){
          levelx += 2
          backx += 1
          tim.x -= 2
          tim.y -= 1
          tim.dir = "l"
          if(count % 7 === 0){
            tim.frame += 1
            if(tim.frame > 5){
              tim.frame = 2
            }
          }
        }
      }
      if(p5.keyIsDown(39)){
        if (levelx > -480 && checkMove(2)){
          levelx -= 2
          backx -= 1
          tim.x += 2
          tim.y -= 1
          tim.dir = "r"
          if(count % 7 === 0){
            tim.frame += 1
            if(tim.frame > 5){
              tim.frame = 2
            }
          }
        }
      }
      if(p5.keyIsDown(38)){
        if(equals(rgbtop, [0, 0, 255]) || equals(rgbbottom, [0, 0, 255])){
          tim.y -= 5
          if (tim.frame < 9) {
            tim.frame = 9
          }
          if (count % 7 === 0) {
            tim.frame += 1
            if (tim.frame > 10) {
              tim.frame = 9
            }
          }
        }
      }
      if(p5.keyIsDown(40)){
        if(equals(rgbtop, [0, 0, 255]) || equals(rgbbottom, [0, 0, 255])){
          if (tim.frame < 9) {
            tim.frame = 9
          }
          if (count % 7 === 0) {
            tim.frame += 1
            if (tim.frame > 10) {
              tim.frame = 9
            }
          }
          if (!equals(rgbbottom, [0, 0, 0]) ) {
            tim.y += 1
          }
        }
      }
      if(tim.jumping === 0){
        doGravity()
      } else {
        if(equals(rgbtop, [255,255,255])){
          tim.y -= tim.jumping / 3
        }
        tim.frame = 7
        tim.jumping -= 1
      }
      if (tim.y > tim.ystore+2) {
        tim.frame = 8
      }
      if ((tim.x === tim.xstore) && (tim.y === tim.ystore)) {
        tim.frame = 1
      }
      tim.image = tim[tim.dir === 'r' ? 'rimages' : 'limages'][tim.frame]
      count += 1
      storeGameData()
    }
  }

  const storeGameData = () => {
    gameData.push([tim.x, tim.y, tim.dir, tim.frame, levelx, backx])
  }

  const doGravity = () => {
    const rgb = collisionMap.get(Math.round(tim.x - levelx), Math.round(tim.y + 25 + 50)).slice(0, 3)
    if(rgb[0] > 100 || equals(rgb, [0, 0, 255])){
      tim.y += 3
    }
  }

  p5.keyPressed = () => {
    if (p5.keyCode === 32) {
      const rgb = collisionMap.get(Math.round(tim.x - levelx), Math.round(tim.y+100)).slice(0, 3)
      if(equals(rgb, [0, 0, 0])){
        tim.frame = 6
        tim.jumping = 12
      }
    }
  }

  const equals = (a, b) =>
      a.length === b.length &&
      a.every((v, i) => v === b[i]);

  const checkMove = xinc => {
    const rgb = collisionMap.get(Math.round(tim.x - levelx + xinc), Math.round(tim.y + 50)).slice(0, 3)
    return equals(rgb, [255, 255, 255]) || equals(rgb, [0, 0, 255])
  }

  const playGameData = () => {
    console.log(count)
    if(gameData.length > 0){
      tim.x = gameData[gameData.length - 1][0]
      tim.y = gameData[gameData.length - 1][1]
      tim.dir = gameData[gameData.length - 1][2]
      tim.frame = gameData[gameData.length - 1][3]
      levelx = gameData[gameData.length - 1][4]
      backx = gameData[gameData.length - 1][5]
      for(let i = 0; i < 2; i++){
        gameData.pop()
      }
      count = gameData.length
    }
  }
})