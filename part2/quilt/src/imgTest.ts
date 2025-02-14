import type { Patch } from "./app";
import P5 from "p5";


export const patch: Patch = function (buf) {
    const sz = buf.width;

    buf.noStroke();
    buf.fill(0, 255, 0);
    // buf.rect(sz * 0.5 - 8, sz * 0.5 - 8, 8, 8, 2);
    buf.text("hi", 0, 0);


};
