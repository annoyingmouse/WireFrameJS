new p5(p5 => {
    const width = 600;
    const height = 400;
    let mapPositionX = 268;
    let mapPositionY = -100;
    const mapWidth = 20;
    const mapHeight = 20;

    p5.setup = () => {
        p5.createCanvas(width, height);
        tail_pieces.push(...Array.apply(null, Array(9)).map(() => new TailPeice(p5, null, null, 'images/tail_piece.png')));
        tail_pieces.push(new TailPeice(p5, null, null, 'images/tail_hook.png'));
    };

    p5.draw = () => {
        p5.background(0);
        timer += 0.01;
        let coordinates = {
            x: width - (size * 2),
            y: height - (size * 2)
        };
        tail_pieces.forEach(function (p, index) {
            coordinates = { ...p.update({ ...coordinates, index, timer }) };
        });
        tail_pieces.filter((p, index) => index % 2 === 0 && p.draw());
        tail_pieces.filter((p, index) => index % 2 === 1 && p.draw());
    };

});