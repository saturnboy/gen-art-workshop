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
            SZ = 100,
            ROWS = p5.floor(H / SZ),
            COLS = p5.floor(W / SZ),
            GAP = p5.min((W - COLS * SZ) / (COLS + 1), (H - ROWS * SZ) / (ROWS + 1));

        p5.noFill();
        p5.stroke(34); // #22
        p5.strokeWeight(1);

        for (let i = 0; i < COLS; i++) {
            for (let j = 0; j < ROWS; j++) {
                const x = i * SZ + GAP * (i + 1),
                    y = j * SZ + GAP * (j + 1);
                sq(x, y, SZ);
            }
        }
    };

    const sq = (x: number, y: number, sz: number) => {
        if (sz <= 5) {
            // too small, so stop recursion
            return;
        }

        const d = [-7, -3, -1, 0, 0, 0, 1, 3, 7],
            d1 = p5.random(d),
            d2 = p5.random(d),
            d3 = p5.random(d),
            d4 = p5.random(d);

        p5.beginShape();
        p5.vertex(x + d1, y + d1);
        p5.vertex(x + sz + d2, y + d2);
        p5.vertex(x + sz + d3, y + sz + d3);
        p5.vertex(x + d4, y + sz + d4);
        p5.endShape(p5.CLOSE);

        const r = p5.floor(p5.random(1, 13));
        sq(x + r, y + r, sz - r * 2);
    };

    p5.keyPressed = () => {
        if (p5.key == " ") {
            p5.clear();
            p5.redraw();
        }
    };
};

new P5(sketch);
