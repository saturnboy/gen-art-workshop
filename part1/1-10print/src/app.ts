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
            SZ = p5.random([20, 25, 32, 48, 72]),
            ROWS = p5.floor(H / SZ),
            COLS = p5.floor(W / SZ);

        p5.background(238); // EE
        p5.stroke(34); // 22
        p5.strokeWeight(p5.random([1, 2, 4, 6, 8]));
        p5.noFill();

        for (let i = 0; i < COLS; i++) {
            for (let j = 0; j < ROWS; j++) {
                const x = i * SZ,
                    y = j * SZ,
                    r = p5.random();

                if (r < 0.5) {
                    p5.line(x, y, x + SZ, y + SZ);
                } else {
                    p5.line(x + SZ, y, x, y + SZ);
                }
            }
        }
    };

    p5.keyPressed = () => {
        if (p5.key == " ") {
            p5.clear();
            p5.redraw();
            //} else if (p5.key == "s") {
            //    console.log("saving 10print.png..");
            //    p5.saveCanvas("10print", "png");
        }
    };
};

new P5(sketch);
