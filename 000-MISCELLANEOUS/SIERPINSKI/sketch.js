const points = [
  [-75, 130],
  [-150, 0],
  [-75, -130],
  [75, -130],
  [150, 0],
  [75, 130],
  [75, 130],
]

const rand = (int) => Math.round(Math.random() * int)

const width = 600
const height = 600


function setup() {
  createCanvas(width, height)
  noStroke()
}

function draw() {
  background(0)
  fill(255, 255, 255)
  text(points.length, 50, 50)
  points.forEach(point => {
    circle(point[0] + (width /2), point[1] + (height /2), 1)
  })
  populateArray(10000, points)
}

const populateArray = (count, arr) => {
  for(let i = 0; i < count; i++){
    const target = points[rand(6)]
    const source = points[points.length - 1]
    const point = [
      Math.round((source[0] + (2/3) * (target[0] - source[0]))),
      Math.round((source[1] + (2/3) * (target[1] - source[1])))
    ]
    if(points.indexOf(point) === -1){
      points.push(point)
    }else{
      console.info('Duplicate removed')
    }

  }
}