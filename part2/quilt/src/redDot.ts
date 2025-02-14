import type { Patch } from "./app";

export const patch: Patch = function (buf) {
    const sz = buf.width;

    buf.noStroke();
    buf.fill(255, 0, 0);
    buf.rect(sz * 0.5 - 8, sz * 0.5 - 8, 8, 8, 2);
};
