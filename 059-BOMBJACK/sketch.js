new p5(p5 => {
  const WIDTH = 600
  const HEIGHT = 650
  const jack = {
    image: null,
    images: [],
    x: 300,
    y: 300,
    thrust: 0,
    dir: 'l'
  }

  let background
  
  let ground
  let roof
  let platform1
  let platform2
  let platform3
  let platform4
  let platform5

  const platformList = [
    roof,
    ground,
    platform1,
    platform2,
    platform3,
    platform4,
    platform5
  ]

  let gameState = 0
  let count = 0
  let frame = 0
  let score = 0

  const bombs = []

  const bombXY = [
    [110,95],
    [170,95],
    [230,95],
    [430,95],
    [490,95],
    [550,95],
    [40,290],
    [40,350],
    [40,410],
    [40,470],
    [560,290],
    [560,350],
    [560,410],
    [560,470],
    [110,605],
    [170,605],
    [230,605],
    [360,545],
    [420,545],
    [480,545]
  ]

  p5.preload = () => {
    background = p5.loadImage(`./images/background.png`)
    ground = p5.loadImage(`./images/ground.png`)
    roof = p5.loadImage(`./images/roof.png`)
    platform1 = p5.loadImage(`./images/platform1.png`)
    platform2 = p5.loadImage(`./images/platform2.png`)
    platform3 = p5.loadImage(`./images/platform3.png`)
    platform4 = p5.loadImage(`./images/platform4.png`)
    platform5 = p5.loadImage(`./images/platform5.png`)
  }

  p5.setup = () => {
    p5.createCanvas(800, 600)
    p5.textSize(28);
    let color = p5.color(255, 255, 255)
    p5.fill(color)
  }

  p5.draw = () => {
  }

  const update = () => {
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

})