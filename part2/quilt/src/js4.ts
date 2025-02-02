import type { Patch } from "./app";

// patch of polygon with random number of sides from triangle (3) to octagon (8)
export const patch: Patch = function (buf) {
    const sides = buf.random([3, 4, 5, 6, 7, 8]),
        aStep = buf.TWO_PI / sides,
        aOffset = buf.random(buf.TWO_PI),
        r = buf.width * 0.5;

    buf.fill(0);
    buf.noStroke();

    buf.beginShape();
    for (let i = 0; i < sides; i++) {
        const a = aOffset + i * aStep,
            x = r + r * buf.cos(a),
            y = r + r * buf.sin(a);

        buf.vertex(x, y);
    }
    buf.endShape(buf.CLOSE);
};
