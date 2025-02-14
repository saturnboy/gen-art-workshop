import type { Patch } from "./app";
import P5 from "p5";

export const patch: Patch = function (buf) {
    // Draw a squiqqly s shape
    const s_thickness = buf.random(1, 10),
        s_offset = buf.random(-s_thickness, s_thickness),
        s_angle = buf.random(-1, 1)
    
    const w = buf.width / 2,
        h = buf.height / 2

    drawSquiggle(buf, w, h, 0.2);
};

// Adapted from: https://editor.p5js.org/cdaein/sketches/SkQmYIRqX
function drawSquiggle(buf : P5.Graphics, w: number, h: number, scale: number) {
    // draw squiggle
    buf.strokeWeight(3);
    buf.stroke(0);
    buf.noFill();
    buf.beginShape();

    const randomX = buf.random(w * scale),
        randomY = buf.random(h * scale);

    const x = w * scale,
        y = h * scale;
    buf.curveVertex(x, y);

    for (let xx = x; xx < w; xx += 25) {
        let yy = buf.random(-h, h);
        buf.curveVertex(xx, yy + randomY);
        buf.curveVertex(xx + randomX, yy + randomY);
        buf.curveVertex(xx + randomX, yy + randomY);
        buf.curveVertex(xx + randomX, yy + randomY);
        buf.curveVertex(xx + randomX, yy + randomY);
        buf.curveVertex(xx + randomX, yy + randomY);
        buf.curveVertex(xx + randomX, yy + randomY);
    }
    buf.endShape();
}

/*
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
*/