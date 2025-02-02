import type { Patch } from "./app";

// ring
export const patch: Patch = function (buf) {
    const sz = buf.width;

    buf.noStroke();
    buf.fill(0);
    buf.circle(sz * 0.5, sz * 0.5, 5);
};
