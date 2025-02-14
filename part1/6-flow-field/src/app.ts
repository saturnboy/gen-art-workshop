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
            sz = p5.floor(p5.min(W, H) * 0.10),
            rows = p5.floor(W / sz),
            cols = p5.floor(H / sz),
            noiseScale = p5.random([0.02, 0.025, 0.03]),
            noiseX = p5.random(1_000, 100_000),
            noiseY = p5.random(1_000, 100_000);

        // build noise grid (actually a list)
        const noise: number[] = [];
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const n = p5.noise(i * noiseScale + noiseX, j * noiseScale + noiseY);
                noise.push(n);
            }
        }

        const numLines = 4000,
            numPoints = p5.random([10, 100, 1000]),
            step = sz * 1.133;

        // draw flow lines (built up one pt at a time)
        for (let l = 0; l < numLines; l++) {
            // start at random pos
            let x = p5.random(0, W),
                y = p5.random(0, H);

            p5.noFill();
            p5.stroke(34, 100);
            p5.strokeWeight(0.5);

            p5.beginShape();
            for (let p = 0; p < numPoints; p++) {
                p5.vertex(x, y);

                if (x < 0 || x >= W || y < 0 || y >= H) {
                    // out of bounds, so line is done
                    break;
                }

                // get flow vector at curr pos
                const i = ~~(y / sz), // ~~ is faster than Math.floor()
                    j = ~~(x / sz),
                    k = i * rows + j,
                    r = noise[k] ?? 0.5;

                // make step in flow's direction
                x += step * p5.cos(p5.TWO_PI * r);
                y += step * p5.sin(p5.TWO_PI * r);
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
