const width = 800;
const height = 400;
const drag = 0.8;
const particles = [];
const framerate = 10;
const speed = 60;

const explode = () => {
    const x = random(width);
    const y = random(height);
    for (var i = 0; i < 100; i++) {
        particles.push({
            x,
            y,
            vx: speed * pow(random(1), 0.5) * sin(random(2 * PI)),
            vy: speed * pow(random(1), 0.5) * cos(random(2 * PI)),
            age: 0,
            birth: new Date()
        });
    }
}

function setup() {
    createCanvas(width, height);
    stroke(255, 230, 128);
    frameRate(framerate);
    explode();
}

function draw() {
    if (frameCount % 10 === 0) {
        explode();
    }
    clear();
    background(0);
    particles.forEach(function (p, index, arr) {
        if (p.age <= 2) {
            const age = new Date().getSeconds() - p.birth.getSeconds();
            point(p.x, p.y);
            p.x = p.x += p.vx * p.age;
            p.y = p.y += p.vy * p.age;
            p.vx = p.vx * Math.pow(drag, p.age);
            p.vy = p.vy * Math.pow(drag, p.age);
            p.age = age;
        } else {
            arr.splice(index, 1);
        }
    });
}