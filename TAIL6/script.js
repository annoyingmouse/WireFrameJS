// Constants that control the wobble effect
const segment_size = 50;  // pixels from one segment to the next
const angle = 2.5;        // Base direction for the tail (radians)
const phase_step = 0.3;   // How much the phase differs in each tail piece (radians)
const wobble_amount = 0.8;// How much of a wobble there is (radians)
const speed = 4.0;        // How fast the wobble moves (radians per second)
const width = 600;
const height = 600;
let seconds = 0;
let tail_pieces = [];

function setup() {
    createCanvas(width, height);
    tail_pieces = Array.from({
        length: 10
    }, (_, i) => ({
        img: loadImage('images/tail_piece.png'),
        x: null,
        y: null
    }));
    tail_pieces.push({
        img: loadImage('images/tail_hook.png'),
        x: null,
        y: null
    });
}
function draw() {
    clear();
    seconds += 0.01;
    let x = width - (segment_size * 2);
    let y = height - (segment_size * 2);
    tail_pieces.forEach(function (p, index, arr) {
        p.x = x;
        p.y = y;
        const temp_angle = angle + wobble_amount * Math.sin(index * phase_step + seconds * speed);
        x += segment_size * Math.cos(temp_angle)
        y -= segment_size * Math.sin(temp_angle)
    });
    tail_pieces.filter((p, index) => index % 2 === 0 && image(p.img, p.x, p.y));
    tail_pieces.filter((p, index) => index % 2 === 1 && image(p.img, p.x, p.y));
}
