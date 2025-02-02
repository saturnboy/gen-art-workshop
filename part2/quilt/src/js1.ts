import type { Patch } from "./app";

// ring
export const patch: Patch = function (buf) {
    const sz = buf.width,
        s = buf.floor(buf.random(1, sz * 0.3)),
        pad = buf.max(1, buf.floor(sz * 0.02));

    buf.stroke(0);
    buf.strokeWeight(s);
    buf.fill(255);
    buf.circle(sz * 0.5, sz * 0.5, sz - s - pad * 2);
};
