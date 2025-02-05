import type { Patch } from "./app";

export const patch: Patch = function (buf) {
    const sz = buf.width,
        pad = 12,
        N = buf.random([50, 65, 80, 100, 140]),
        step = (sz - pad * 3) / N;

    buf.stroke(0);
    buf.strokeWeight(0.5);
    buf.fill(255);

    const s = buf.random(0.2, 0.35),
        c = buf.random(1.8, 3.2),
        re = buf.random([0.85, 1, 1, 1.15]),
        rs = buf.random([20, 25, 30, 35]);

    for (let i = 0; i <= N; i++) {
        const f = i / N,
            x = sz * (0.5 + s * f * buf.sin(c * f * buf.TWO_PI)),
            y = i * step + pad,
            r = f * rs + 3;

        if (f > 0.999) {
            buf.fill(buf.random([64, 128, 239, 255, 255, 255, 255]));
        }
        buf.ellipse(x, y, r * re, r);
    }
};
