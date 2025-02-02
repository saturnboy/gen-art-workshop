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
            SZ = p5.floor(p5.min(W, H) * 0.01),
            ROWS = p5.floor(W / SZ),
            COLS = p5.floor(H / SZ),
            NSCALE = p5.random([0.02, 0.025, 0.03]),
            NX = p5.random(1_000, 100_000),
            NY = p5.random(1_000, 100_000);

        // build noise grid (actually a list)
        const noise: number[] = [];

        for (let i = 0; i < COLS; i++) {
            for (let j = 0; j < ROWS; j++) {
                const n = p5.noise(i * NSCALE + NX, j * NSCALE + NY);
                noise.push(n);
            }
        }

        const NUM_LINES = 4000,
            NUM_POINTS = p5.random([10, 100, 1000]),
            STEP = SZ * 1.333;

        for (let l = 0; l < NUM_LINES; l++) {
            let x = p5.random(0, W),
                y = p5.random(0, H);

            p5.noFill();
            p5.stroke(34, 100);
            p5.strokeWeight(0.5);

            p5.beginShape();
            for (let p = 0; p < NUM_POINTS; p++) {
                p5.vertex(x, y);

                if (x < 0 || x >= W || y < 0 || y >= H) {
                    // out of bounds, so line is done
                    break;
                }

                const i = ~~(y / SZ), // ~~ is faster than Math.floor()
                    j = ~~(x / SZ),
                    k = i * ROWS + j,
                    r = noise[k] ?? 0.5;

                x += STEP * p5.cos(p5.TWO_PI * r);
                y += STEP * p5.sin(p5.TWO_PI * r);
            }
            p5.endShape();
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
