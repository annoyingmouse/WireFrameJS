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
  const jackImages = ['d', 'f', 'l1', 'l2', 'lf', 'r1', 'r2', 'rf', 'u']

  let background = {
    image: null,
    x: 0,
    y: 0
  }
  
  let ground = {
    image: null,
    x: 300,
    y: 640
  }
  let roof = {
    image:null,
    x: 300,
    y: 61
  }
  let platform1 = {
    image: null,
    x: 400,
    y: 180
  }
  let platform2 = {
    image: null,
    x: 420,
    y: 580
  }
  let platform3 = {
    image: null,
    x: 320,
    y: 440
  }
  let platform4 = {
    image: null,
    x: 180,
    y: 250
  }
  let platform5 = {
    image: null,
    x: 120,
    y: 510
  }

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
  const bombImages = Array.from({length: 5}, (x, i) => i)
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
    background.image = p5.loadImage(`./images/background.png`)
    ground.image = p5.loadImage(`./images/ground.png`)
    roof.image = p5.loadImage(`./images/roof.png`)
    platform1.image = p5.loadImage(`./images/platform1.png`)
    platform2.image = p5.loadImage(`./images/platform2.png`)
    platform3.image = p5.loadImage(`./images/platform3.png`)
    platform4.image = p5.loadImage(`./images/platform4.png`)
    platform5.image = p5.loadImage(`./images/platform5.png`)
    jackImages.forEach(jackImage => {
      jack.images[jackImage] = p5.loadImage(`./images/jack${jackImage}.png`)
    })
    jack.image = p5.loadImage(`./images/jackf.png`)
    bombXY.forEach(coordinates  => {
      bombs.push({
        images: bombImages.map(num => p5.loadImage(`./images/bomb${num}.png`)),
        image: p5.loadImage(`./images/bomb1.png`),
        x: coordinates[0],
        y: coordinates[1],
        state: 1
      })
    })
  }

  p5.setup = () => {
    console.log(jack)
    p5.createCanvas(600, 650)
    p5.textSize(28);
    let color = p5.color(255, 255, 255)
    p5.fill(color)
  }

  p5.draw = () => {
    p5.imageMode(p5.CORNER)

    p5.image(background.image, background.x, background.y)
    p5.imageMode(p5.CENTER)
    platformList.forEach(plat => {
      p5.image(plat.image, plat.x, plat.y)
    })
    bombs.forEach(bomb => {
      if(bomb.state > 0){
        bomb.image = bomb.images[bomb.state]
        p5.image(bomb.image, bomb.x, bomb.y)
      }
    })
    p5.image(jack.image, jack.x, jack.y)
    update()
  }

  const update = () => {
    if(gameState === 0){
      jack.dir = 'f'
      const ytest = jack.y
      if(p5.keyIsDown(38)){
        jack.dir = 'u'
      }


    }
  }

  const touching = (obj1, obj2) => {
    // https://stackoverflow.com/questions/16005136/how-do-i-see-if-two-rectangles-intersect-in-javascript-or-pseudocode#answer-54323789
    const one = {
      left: obj1.x - (obj1.image.width / 2),
      top: (obj1.y - (obj1.image.height / 2)) + obj1.image.height,
      right: (obj1.x - (obj1.image.width / 2)) + obj1.image.width,
      bottom: obj1.y - (obj1.image.height / 2)
    }
    const two = {
      left: obj2.x - (obj2.image.width / 2),
      top: (obj2.y - (obj2.image.height / 2)) + obj2.image.height,
      right: (obj2.x - (obj2.image.width / 2)) + obj2.image.width,
      bottom: obj2.y - (obj2.image.height / 2)
    }
    // The first rectangle is under the second or vice versa
    if (one.top <= two.bottom || two.top <= one.bottom) {
      return false
    }
    // The first rectangle is to the left of the second or vice versa
    if (one.right <= two.left || two.right <= one.left) {
      return false
    }
    // Rectangles overlap
    return true;
  }


})