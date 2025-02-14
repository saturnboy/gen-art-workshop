import type { Patch } from "./app";

export const patch: Patch = function (buf) {
    const rows = buf.random([2, 3, 4, 5]),
        cols = rows,
        s = buf.width / rows;

    buf.stroke(0);
    buf.strokeWeight(buf.random([1, 2, 4, 6]));
    buf.noFill();

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const r = buf.random(),
                x = i * s,
                y = j * s;

            if (r < 0.5) {
                buf.line(x, y, x + s, y + s);
            } else {
                buf.line(x + s, y, x, y + s);
            }
        }
    }
};
