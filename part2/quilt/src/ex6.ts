import type { Patch } from "./app";

export const patch: Patch = function (buf) {
    const sz = buf.width,
        cellSz = buf.max(1, buf.floor(buf.min(sz) * 0.01)),
        n = buf.floor(sz / cellSz),
        nScale = buf.random([0.02, 0.03, 0.04]),
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

    const numLines = buf.random([200, 400, 600]),
        numPoints = buf.random([20, 40, 60]),
        step = cellSz * 1.5;

    buf.noFill();
    buf.stroke(0, buf.random([50, 100, 150]));
    buf.strokeWeight(0.5);

    for (let l = 0; l < numLines; l++) {
        let x = buf.random(0, sz),
            y = buf.random(0, sz);

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
