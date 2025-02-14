import type { Patch } from "./app";
import P5 from "p5";

export const patch: Patch = function (buf) {
    const sz = buf.width;

    buf.noStroke();
    buf.fill(255, 0, 0);
    // buf.rect(sz * 0.5 - 8, sz * 0.5 - 8, 8, 8, 2);
    let img = buf.loadImage("https://avatars.githubusercontent.com/u/62250?v=4",
        (img: P5.Image) => { buf.image(img, 0, 0) })
    buf.text("hi", 0, 0)

};
