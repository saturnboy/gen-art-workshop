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
            rows = 16,
            cols = 8,
            gap = 1.4,
            yOffset = 10,
            sz = ((H - yOffset * 2) / (rows * gap)) * 0.95,
            xOffset = (W - sz * gap * cols) * 0.5;

        p5.background(238); // EE
        p5.stroke(34); // 22
        p5.strokeWeight(1);
        p5.noFill();

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const a = p5.random() - 0.5,
                    x = p5.random() - 0.5,
                    y = p5.random() - 0.5;

                p5.push();
                p5.translate(
                    i * sz * gap + sz * 0.5 + xOffset + x * p5.pow(j, 1.1),
                    j * sz * gap + sz * 0.5 + yOffset + y * p5.pow(j, 1.3)
                );
                p5.rotate((p5.PI / 180) * a * p5.pow(j, 2));
                p5.rect(-sz * 0.5, -sz * 0.5, sz, sz);
                p5.pop();
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
