new p5(p5 => {
  const link = {
    images: [],
    image: null,
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
    image: null,
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
      image: null,
      x: position.x,
      y: position.y,
      state: 10,
      frame: 0,
      movex: 0,
      movey: 0,
      dir: 0,
      testx: 0,
      testy: 0,
      angle: 0
    }
  })
  let map = {
    image: null,
    x: 0,
    y: 10,
    scrollx: 0,
    scrolly: 0,
  }
  let tree
  let ground
  let boulder
  let rock
  let logo
  let triforce


  p5.preload = () => {
    for(let i = 0; i < 8; i++){
      let image = p5.loadImage(`./images/link_${i + 1}.png`)
      if(i === 0){
        link.image = image
      }
      link.images.push(image)
    }
    for(let i = 0; i < 4; i++){
      let image = p5.loadImage(`./images/sword_${i}.png`)
      if(i === 0){
        sword.image = image
      }
      sword.images.push(image)
    }
    monsters.forEach(monster => {
      for(let i = 0; i < 8; i++){
        let image = p5.loadImage(`./images/monster_${i + 1}.png`)
        if(i === 0){
          monster.image = image
        }
        monster.images.push(image)
      }
    })
    map.image = p5.loadImage(`./images/map.png`)
    tree = p5.loadImage(`./images/tree.png`)
    ground = p5.loadImage(`./images/ground.png`)
    boulder = p5.loadImage(`./images/boulder.png`)
    rock = p5.loadImage(`./images/rock.png`)
    logo = p5.loadImage(`./images/logo.png`)
    triforce = p5.loadFont('./fonts/Triforce.ttf')
  }

  const equals = (a, b) =>
      a.length === b.length &&
      a.every((v, i) => v === b[i]);

  p5.setup = () => {
    p5.createCanvas(800, 800)
    p5.textFont(triforce);
    p5.textSize(28);
  }

  p5.draw = () => {
    p5.imageMode(p5.CORNER)
    p5.image(logo, 612, 10)
    let color = p5.color(0, 0, 0)
    p5.fill(color)
    p5.text(`W A S D TO MOVE`, 285, 38);
    p5.text(`SPACE TO USE SWORD`, 285, 78);
    drawMap()
    drawChars()
    update()
  }

  const drawMap = () => {
    const xTest = Math.floor((link.x / 50) + link.movex)
    const yTest = Math.floor(((link.y = 100) / 50) + link.movey)
    for(let x = 0; x < 16; x++){
      for(let y = 0; y < 16; y++){
        const col = map.image.get(x + map.x, y + map.y).slice(0, 3)
        if(equals(col, [0,255,0])){
          p5.image(tree, x*50, (y*50)+100);
        }
        if(equals(col, [0,0,0])){
          p5.image(ground, x*50, (y*50)+100);
        }
        if(equals(col, [255,0,0])){
          p5.image(boulder, x*50, (y*50)+100);
        }
        if(equals(col, [255,255,0])){
          p5.image(rock, x*50, (y*50)+100);
        }
      }
    }
    let color = p5.color(100, 100, 100)
    p5.fill(color)
    p5.rect(10, 10, 266, 80)
    const mx = (map.x * 50) + link.x
    const my = (map.y * 50) + link.y
    color = p5.color(0, 255, 0)
    p5.fill(color)
    p5.rect((mx / 12) + 10, my / 12, 4, 4)
  }

  const drawChars = () => {
    link.image = link.images[(((link.dir * 2) + 1) + Math.floor(link.frame / 10)) - 1]
    if(sword.frame > 0 && sword.dir === 2){
      p5.image(sword.image, sword.x, sword.y)
    }
    console.log(link.x, link.y)
    p5.image(link.image, link.x, link.y)
    monsters.forEach(monster => {
      if(onScreen(monster.x,monster.y) && monster.state > 0){
        if(monster.state < 10){
          monster.angle += 10
          monster.state -= 1
        }
        if(monster.state === 10){
          monster.image = monster.images[(((monster.dir * 2) + 1) + Math.floor(monster.frame / 10)) - 1]
        }
        p5.image(monster.image, monster.x, monster.y)
      }
    })
  }

  const update = () => {
    checkInput()
    moveChars()
    if(map.scrollx > 0){
      mapScroll(1,0)
    }
    if(map.scrollx < 0) {
      mapScroll(-1, 0)
    }
    if(map.scrolly > 0) {
      mapScroll(0, 1)
    }
    if(map.scrolly < 0) {
      mapScroll(0, -1)
    }

    if (sword.frame > 0) {
      if (sword.frame > 5) {
        sword.x += myDirs[sword.dir][0] * 2
        sword.y += myDirs[sword.dir][1] * 2
      } else {
        sword.x -= myDirs[sword.dir][0] * 2
        sword.y -= myDirs[sword.dir][1] * 2
      }
      sword.frame -= 1
      monsters.forEach(monster => { // TODO
        // if (monster.collidepoint((sword.x, sword.y))){
        //   monster.state = 9
        // }
      })
      
      
    }
    
    
  }

  const mapScroll = (x, y) => {
    map.x += x
    map.scrollx -= x
    link.x -= x * 50
    map.y += y
    map.scrolly -= y
    link.y -= y * 50
    monsters.forEach(monster => {
      monster.x -= x * 50
      monster.y -= y * 50
    })
  }

  const moveChars = () => {
    getCharDir(link)
    if(link.movex || link.movey){
      link.frame += 1
      if(link.frame >= 20){
        link.frame = 0
      }
      if(link.movex === 1){
        link.testx = Math.round((link.x - 48) / 50 + (link.movex))
      }else{
        link.testx = Math.round((link.x) / 50 + (link.movex))
      }
      if(link.movey === 1) {
        link.testy = Math.round((link.y - 148) / 50 + (link.movey))
      }else {
        link.testy = Math.round((link.y - 100) / 50 + (link.movey))
      }
      console.log(map.image.get(link.testx + map.x, link.testy + map.y).slice(0, 3))
      if(equals(map.image.get(link.testx + map.x, link.testy + map.y).slice(0, 3), [0, 0, 0])){
        link.x += link.movex*2
        link.y += link.movey*2
      }
      link.movex = 0
      link.movey = 0
      if ((link.x > 800) && (map.scrollx === 0)) {
        map.scrollx = 16
      }
      if ((link.x < 0) && (map.scrollx === 0)) {
        map.scrollx = -16
      }
      if ((link.y > 600) && (map.scrolly === 0)) {
        map.scrolly = 10
      }
      if ((link.y < 100) && (map.scrolly === 0)) {
        map.scrolly = -10
      }
    }
    monsters.forEach(monster => {
      if (onScreen(monster.x, monster.y) && monster.state === 10) {
        if (monster.x > link.x + 50){
          monster.movex = -1
          monster.testx = Math.round((monster.x) / 50 + (monster.movex))
        } else {
          if (monster.x < link.x-50){
            monster.movex = 1
            monster.testx = Math.round((monster.x - 48) / 50 + (monster.movex))
          }
        }
        if (monster.y > link.y+50) {
          monster.movey = -1
          monster.testy = Math.round((monster.y - 100) / 50 + (monster.movey))
        } else {
          if (monster.y < link.y - 50) {
            monster.movey = 1
            monster.testy = Math.round((monster.y - 148) / 50 + (monster.movey))
          }
        }
        getCharDir(monster)
        if (monster.movex || monster.movey) {
          monster.frame += 1
          if (monster.frame >= 20) {
            monster.frame = 0
          }
          if(equals(map.image.get(monster.testx + map.x, monster.testy + map.y).slice(0, 3), [0,0,0])){
            monster.x += monster.movex*2
            monster.y += monster.movey*2
          }
          monster.movex = 0
          monster.movey = 0
        }
      }
    })
  }

  const checkInput = () => {
    if(p5.keyIsDown(65)){
      link.movex = -1
    }
    if(p5.keyIsDown(68)){
      link.movex = 1
    }
    if(p5.keyIsDown(87)){
      link.movey = -1
    }
    if(p5.keyIsDown(83)){
      link.movey = 1
    }
  }

  const getCharDir = (ch) => {
    myDirs.forEach((d, i) => {
      if(equals(d, [ch.movex, ch.movey])){
        ch.dir = i
      }
    })
  }

  const onScreen = (x, y) => x > 0 && x < 800 && y > 100 && y < 800

})