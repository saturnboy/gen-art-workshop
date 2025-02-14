import type { Patch } from "./app";

export const patch: Patch = function (buf) {
    const sz = buf.width;

    buf.noStroke();
    buf.fill(255, 0, 0);
    buf.rect(sz * 0.5 - 8, sz * 0.5 - 8, 8, 8, 2);
    let img = buf.loadImage("https://avatars.githubusercontent.com/u/62250?v=4")
    buf.image(img, 0, 0)
};
