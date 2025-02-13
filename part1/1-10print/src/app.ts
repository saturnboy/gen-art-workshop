import P5 from "p5";

const sketch = (p5: P5) => {
    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };

    p5.setup = () => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        p5.noLoop();
    };

    p5.draw = () => {
        const W = p5.windowWidth,
            H = p5.windowHeight,
            sz = p5.random([20, 25, 32, 48, 72]),
            rows = p5.floor(H / sz),
            cols = p5.floor(W / sz),
            strokeWeight = p5.random([1, 2, 4, 6, 8]);

        p5.background(238); // EE
        p5.stroke(34); // 22
        p5.strokeWeight(strokeWeight);
        p5.noFill();

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const x = i * sz,
                    y = j * sz,
                    r = p5.random();

                if (r < 0.5) {
                    p5.line(x, y, x + sz, y + sz); // '\'
                } else {
                    p5.line(x + sz, y, x, y + sz); // '/'
                }
            }
        }
    };

    p5.keyPressed = () => {
        if (p5.key == " ") {
            p5.clear();
            p5.redraw();
        }
    };
};

new P5(sketch);
