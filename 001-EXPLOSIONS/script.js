new p5(p5 => {

    const width = 800;
    const height = 400;
    const drag = 0.8;
    const particles = [];
    const framerate = 10;
    const speed = 60;
    
    p5.setup = () => {
        p5.createCanvas(width, height);
        p5.stroke(255, 255, 255);
        p5.frameRate(framerate);
        p5.background(0);
        explode();
    };

    p5.draw = () => {
        p5.clear();
        p5.background(0);
        if (p5.frameCount % framerate === 0) {
            explode();
        }
        particles.forEach((p, index, arr) => {
            if (p.age <= 2) {
                const age = new Date().getSeconds() - p.birth.getSeconds();
                p5.point(p.x, p.y);
                p.x += p.vx * p.age;
                p.y += p.vy * p.age;
                p.vx *= Math.pow(drag, p.age);
                p.vy *= Math.pow(drag, p.age);
                p.age = age;
            } else {
                arr.splice(index, 1);
            }
        });

    };

    const explode = () => {
        const x = p5.random(width);
        const y = p5.random(height);
        particles.push(...Array.apply(null, Array(100)).map(() => ({
            x,
            y,
            vx: speed * Math.pow(p5.random(1), 0.5) * Math.sin(p5.random(2 * Math.PI)),
            vy: speed * Math.pow(p5.random(1), 0.5) * Math.cos(p5.random(2 * Math.PI)),
            age: 0,
            birth: new Date()
        })));
    }
});
