import type { Patch } from "./app";

// diamond
export const patch: Patch = function (buf) {
    const sz = buf.width,
        s = buf.floor(buf.random(1, sz * 0.3)),
        sOffset = s * 0.5 * Math.SQRT2;

    buf.stroke(0);
    buf.strokeWeight(s);
    buf.fill(255);

    buf.beginShape();
    buf.vertex(sz * 0.5, sOffset);
    buf.vertex(sz - sOffset, sz * 0.5);
    buf.vertex(sz * 0.5, sz - sOffset);
    buf.vertex(sOffset, sz * 0.5);
    buf.endShape(buf.CLOSE);
};
