import type { Patch } from "./app";

// dice
export const patch: Patch = function (buf) {
    const sz = buf.width,
        d = buf.random(0, 6),
        pad = buf.max(1, buf.floor(sz * 0.02)),
        pip = sz * 0.19,
        left = sz * 0.26,
        right = sz * 0.74,
        cent = sz * 0.5;

    buf.fill(0);
    buf.noStroke();
    buf.rect(pad, pad, sz - pad * 2, sz - pad * 2, sz * 0.1);

    buf.fill(255);
    if (d < 1) {
        buf.circle(cent, cent, pip);
    } else if (d < 2) {
        buf.circle(left, left, pip);
        buf.circle(right, right, pip);
    } else if (d < 3) {
        buf.circle(left, left, pip);
        buf.circle(cent, cent, pip);
        buf.circle(right, right, pip);
    } else if (d < 4) {
        buf.circle(left, left, pip);
        buf.circle(left, right, pip);
        buf.circle(right, left, pip);
        buf.circle(right, right, pip);
    } else if (d < 5) {
        buf.circle(left, left, pip);
        buf.circle(left, right, pip);
        buf.circle(cent, cent, pip);
        buf.circle(right, left, pip);
        buf.circle(right, right, pip);
    } else {
        buf.circle(left, left, pip);
        buf.circle(left, cent, pip);
        buf.circle(left, right, pip);
        buf.circle(right, left, pip);
        buf.circle(right, cent, pip);
        buf.circle(right, right, pip);
    }
};
