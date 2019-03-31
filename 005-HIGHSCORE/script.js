new p5(p5 => {

    const scores = Array.apply(null, Array(10)).map(() => ({
        player: "Player",
        score: 0
    }));
    const width = 600;
    const height = 600;

    p5.setup = () => {
        p5.createCanvas(width, height);
        for (let i = 0; i < 3; i++) {
            scores[i].player = prompt("High score! What is your name?");
            scores[i].score = getRandomInt(50, 100);
        }
        scores.sort((a, b) => a.score - b.score);
        scores.reverse();
    };

    p5.draw = () => {
        p5.background(0);
        p5.textSize(32);
        p5.fill(255, 255, 255);
        p5.textStyle(p5.BOLD);
        p5.text('Score', 100, 70);
        p5.text('Name', 300, 70);
        let y = 130;
        scores.forEach((score) => {
            p5.textSize(32);
            p5.textStyle(p5.NORMAL);
            p5.text(score.player, 100, y);
            p5.text(score.score, 300, y);
            y += 45;
        });
    };

    getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

});