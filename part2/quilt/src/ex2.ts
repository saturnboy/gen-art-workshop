import type { Patch } from "./app";

export const patch: Patch = function (buf) {
    const sz = buf.width,
        cols = buf.random([1, 2, 3, 4]),
        rows = cols + 1,
        pad = 4, // space between cells
        yOffset = pad, // space between top and first cell
        s = (sz - pad * rows - yOffset) / rows, // cell size
        xOffset = (sz - cols * s - pad * (cols - 1)) * 0.5; // space between left and first cell (to center it)

    buf.stroke(0);
    buf.strokeWeight(buf.random([1, 2]));
    buf.noFill();

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const a = 2 * buf.random() - 1,
                x = xOffset + i * s + i * pad,
                y = yOffset + j * s + j * pad;

            buf.push();
            buf.translate(x + s * 0.5, y + s * 0.5);
            buf.rotate((buf.PI / 180) * a * (j + 1) * (j + 1) * (j + 1));
            buf.square(-s * 0.5, -s * 0.5, s);
            buf.pop();
        }
    }
};
