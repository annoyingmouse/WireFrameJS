new p5((p5) => {
  const WIDTH = 600;
  const HEIGHT = 650;
  const jack = {
    image: null,
    images: [],
    x: 300,
    y: 300,
    thrust: 0,
    dir: "l",
  };
  const jackImages = ["d", "f", "l1", "l2", "lf", "r1", "r2", "rf", "u"];

  let background = {
    image: null,
    x: 0,
    y: 0,
  };

  let ground = {
    image: null,
    x: 300,
    y: 640,
  };
  let roof = {
    image: null,
    x: 300,
    y: 61,
  };
  let platform1 = {
    image: null,
    x: 400,
    y: 180,
  };
  let platform2 = {
    image: null,
    x: 420,
    y: 580,
  };
  let platform3 = {
    image: null,
    x: 320,
    y: 440,
  };
  let platform4 = {
    image: null,
    x: 180,
    y: 250,
  };
  let platform5 = {
    image: null,
    x: 120,
    y: 510,
  };

  const platformList = [
    roof,
    ground,
    platform1,
    platform2,
    platform3,
    platform4,
    platform5,
  ];

  let gameState = 0;
  let count = 0;
  let frame = 0;
  let score = 0;

  const bombs = [];
  const bombImages = Array.from({ length: 5 }, (x, i) => i);
  const bombXY = [
    [110, 95],
    [170, 95],
    [230, 95],
    [430, 95],
    [490, 95],
    [550, 95],
    [40, 290],
    [40, 350],
    [40, 410],
    [40, 470],
    [560, 290],
    [560, 350],
    [560, 410],
    [560, 470],
    [110, 605],
    [170, 605],
    [230, 605],
    [360, 545],
    [420, 545],
    [480, 545],
  ];

  p5.preload = () => {
    background.image = p5.loadImage(`./images/background.png`);
    ground.image = p5.loadImage(`./images/ground.png`);
    roof.image = p5.loadImage(`./images/roof.png`);
    platform1.image = p5.loadImage(`./images/platform1.png`);
    platform2.image = p5.loadImage(`./images/platform2.png`);
    platform3.image = p5.loadImage(`./images/platform3.png`);
    platform4.image = p5.loadImage(`./images/platform4.png`);
    platform5.image = p5.loadImage(`./images/platform5.png`);
    jackImages.forEach((jackImage) => {
      jack.images[jackImage] = p5.loadImage(`./images/jack${jackImage}.png`);
    });
    jack.image = p5.loadImage(`./images/jackf.png`);
    bombXY.forEach((coordinates) => {
      bombs.push({
        images: bombImages.map((num) =>
          p5.loadImage(`./images/bomb${num}.png`),
        ),
        image: p5.loadImage(`./images/bomb1.png`),
        x: coordinates[0],
        y: coordinates[1],
        state: 1,
      });
    });
  };

  p5.setup = () => {
    p5.createCanvas(600, 650);
    p5.textSize(28);
    let color = p5.color(255, 255, 255);
    p5.fill(color);
  };

  p5.draw = () => {
    p5.imageMode(p5.CORNER);
    p5.image(background.image, background.x, background.y);
    p5.imageMode(p5.CENTER);
    platformList.forEach((plat) => {
      p5.image(plat.image, plat.x, plat.y);
    });
    bombs.forEach((bomb) => {
      if (bomb.state > 0) {
        bomb.image = bomb.images[Math.round(bomb.state)];
        p5.image(bomb.image, bomb.x, bomb.y);
      }
    });
    p5.image(jack.image, jack.x, jack.y);
    p5.textSize(40);
    p5.fill(255, 0, 0);
    p5.drawingContext.shadowBlur = 5;
    p5.drawingContext.shadowColor = p5.color(255, 255, 255);
    p5.textAlign(p5.CENTER, p5.TOP);
    p5.text(`SCORE:${score}`, 0, 10, 600);
    if (gameState === 1) {
      p5.textSize(50);
      p5.fill(0, 255, 255);
      p5.textAlign(p5.CENTER, p5.TOP);
      p5.text(`LEVEL CLEARED`, 0, 300, 600);
    }
    update();
  };

  const update = () => {
    if (gameState === 0) {
      jack.dir = "f";
      const ytest = jack.y;
      if (p5.keyIsDown(38)) {
        jack.dir = "u";
      }
      if (!checkCollisions(platformList, jack, "falling")) {
        jack.y += 4;
      }
      if (!checkCollisions(platformList, jack, "flying")) {
        jack.y -= jack.thrust;
      }
      jack.thrust = limit(jack.thrust - 0.4, 0, 20);
      if (jack.y > ytest + 1) jack.dir = "d";
      if (jack.y < ytest - 1) jack.dir = "u";
      if (p5.keyIsDown(37) && jack.x > 40) {
        if (jack.y !== ytest) {
          jack.dir = "lf";
          jack.y -= 2;
        } else {
          jack.dir = `l${(frame % 2) + 1}`;
        }
        jack.x -= 2;
      }
      if (p5.keyIsDown(39) && jack.x < 560) {
        if (jack.y !== ytest) {
          jack.dir = "rf";
          jack.y -= 2;
        } else {
          jack.dir = `r${(frame % 2) + 1}`;
        }
        jack.x += 2;
      }
      jack.image = jack.images[jack.dir];
      checkBombs();
      count += 1;
      if (count % 5 === 0) frame += 1;
    }
  };

  p5.keyPressed = () => {
    if (gameState === 0) {
      if (p5.keyCode === p5.UP_ARROW) {
        jack.thrust = 20;
        jack.dir = "u";
      }
    }
  };

  const limit = (num, min, max) => Math.min(Math.max(num, min), max);

  const checkBombs = () => {
    let bombsCollected = 0;
    bombs.forEach((b) => {
      if (b.state > 1) b.state += 0.4;
      if (b.state === 0) bombsCollected += 1;
      if (touching(jack, b) && b.state === 1) b.state = 1.4;
      if (Math.round(b.state) > 4) {
        b.state = 0;
        score += 100;
      }
      if (bombsCollected === bombs.length) gameState = 1;
    });
  };

  const checkCollisions = (platformList, jack, direction) => {
    let returnValue = false;
    const jackArr = [
      direction === "flying"
        ? jack.y - jack.image.height / 2
        : jack.y - jack.image.height / 2 + jack.image.height,
      jack.x - jack.image.width / 2 + jack.image.width,
      direction === "flying"
        ? jack.y - jack.image.height / 2
        : jack.y - jack.image.height / 2 + jack.image.height,
      jack.x - jack.image.width / 2,
    ];
    platformList.forEach((platform) => {
      if (touching(platform, jackArr)) {
        returnValue = true;
      }
    });
    return returnValue;
  };

  const touching = (firstObjectOrArray, secondObjectOrArray) => {
    /*
     * Adapted from:
     * https://stackoverflow.com/questions/16005136/how-do-i-see-if-two-rectangles-intersect-in-javascript-or-pseudocode#answer-54323789
     * If an array, then values should be top, right, bottom, left (like CSS)
     */
    const firstRectangle = {
      left: Array.isArray(firstObjectOrArray)
        ? firstObjectOrArray[3]
        : firstObjectOrArray.x - firstObjectOrArray.image.width / 2,
      top: Array.isArray(firstObjectOrArray)
        ? firstObjectOrArray[0]
        : firstObjectOrArray.y -
          firstObjectOrArray.image.height / 2 +
          firstObjectOrArray.image.height,
      right: Array.isArray(firstObjectOrArray)
        ? firstObjectOrArray[1]
        : firstObjectOrArray.x -
          firstObjectOrArray.image.width / 2 +
          firstObjectOrArray.image.width,
      bottom: Array.isArray(firstObjectOrArray)
        ? firstObjectOrArray[2]
        : firstObjectOrArray.y - firstObjectOrArray.image.height / 2,
    };
    const secondRectangle = {
      left: Array.isArray(secondObjectOrArray)
        ? secondObjectOrArray[3]
        : secondObjectOrArray.x - secondObjectOrArray.image.width / 2,
      top: Array.isArray(secondObjectOrArray)
        ? secondObjectOrArray[0]
        : secondObjectOrArray.y -
          secondObjectOrArray.image.height / 2 +
          secondObjectOrArray.image.height,
      right: Array.isArray(secondObjectOrArray)
        ? secondObjectOrArray[1]
        : secondObjectOrArray.x -
          secondObjectOrArray.image.width / 2 +
          secondObjectOrArray.image.width,
      bottom: Array.isArray(secondObjectOrArray)
        ? secondObjectOrArray[2]
        : secondObjectOrArray.y - secondObjectOrArray.image.height / 2,
    };
    // The first rectangle is under the second or vice versa
    if (
      firstRectangle.top <= secondRectangle.bottom ||
      secondRectangle.top <= firstRectangle.bottom
    ) {
      return false;
    }

    // The first rectangle is to the left of the second or vice versa
    if (
      firstRectangle.right <= secondRectangle.left ||
      secondRectangle.right <= firstRectangle.left
    ) {
      return false;
    }
    // Rectangles overlap
    return true;
  };
});
