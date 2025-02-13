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
            sz = 100,
            rows = p5.floor(H / sz),
            cols = p5.floor(W / sz),
            gap = p5.min((W - cols * sz) / (cols + 1), (H - rows * sz) / (rows + 1));

        p5.noFill();
        p5.stroke(34); // #22
        p5.strokeWeight(1);

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const x = i * sz + gap * (i + 1),
                    y = j * sz + gap * (j + 1);
                drawSquare(x, y, sz);
            }
        }
    };

    const drawSquare = (x: number, y: number, sz: number) => {
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
        drawSquare(x + r, y + r, sz - r * 2);
    };

    p5.keyPressed = () => {
        if (p5.key == " ") {
            p5.clear();
            p5.redraw();
        }
    };
};

new P5(sketch);
