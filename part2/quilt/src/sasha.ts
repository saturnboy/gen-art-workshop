import type { Patch } from "./app";

export const patch: Patch = function (buf) {
    const sz = buf.width,
        cellSz = buf.max(1, buf.floor(buf.min(sz) * 0.05)),
        n = buf.floor(sz / cellSz),
        nScale = buf.random([0.01, 0.05, 0.1]),
        nX = buf.random(-1_000, 1_000),
        nY = buf.random(-1_000, 1_000);

    // build noise grid (actually a list)
    const noise: number[] = [];

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const n = buf.noise(i * nScale + nX, j * nScale + nY);
            noise.push(n);
        }
    }

    const numLines = buf.random([100, 500, 700]),
        numPoints = buf.random([2, 20, 100]),
        step = cellSz * 1.5;

    buf.noFill();
    let g = buf.random(150, 227);
    let b = 127;
    let a = buf.random([80, 127, 220]);
    buf.stroke(0, g, b, a);
    buf.strokeWeight(0.4);

    for (let l = 0; l < numLines; l++) {
        let x = buf.random(0, sz),
            y = buf.random(0, sz);

        let rMin = buf.random(0, 20);
        let rMax = buf.random(25, 50);
        let r = buf.random(rMin, rMax);
        buf.stroke(l + Math.floor(r / numLines), g, b, a);
        buf.beginShape();
        for (let p = 0; p < numPoints; p++) {
            buf.vertex(x, y);

            if (x < 0 || x >= sz || y < 0 || y >= sz) {
                // out of bounds, so line is done
                break;
            }

            const i = ~~(y / cellSz), // ~~ is faster than Math.floor()
                j = ~~(x / cellSz),
                k = i * n + j,
                r = noise[k] ?? 0.5;

            x += step * buf.cos(buf.TWO_PI * r);
            y += step * buf.sin(buf.TWO_PI * r);
        }
        buf.endShape();
    }
};
