import type { Patch } from "./app";

export const patch: Patch = function (buf) {
    const sz = buf.width,
        steps = [-20, -10, -1, 0, 0, 0, 1, 10, 20];

    const sq = (x: number, y: number, sz: number) => {
        if (sz <= 5) {
            // too small, so stop recursion
            return;
        }

        const d1 = buf.random(steps),
            d2 = buf.random(steps),
            d3 = buf.random(steps),
            d4 = buf.random(steps);

        buf.beginShape();
        buf.vertex(x + d1, y + d1);
        buf.vertex(x + sz + d2, y + d2);
        buf.vertex(x + sz + d3, y + sz + d3);
        buf.vertex(x + d4, y + sz + d4);
        buf.endShape(buf.CLOSE);


        //const r = buf.random([1, 2, 3, 4, 5, 6, 7, 8]);
        
        let r = buf.floor(buf.random(1, 100));
        r = Math.ceil(Math.abs(Math.log(Math.cos(r) * Math.cos(r))));

        sq(x + r, y + r, sz - r * 2);
    };

    buf.stroke(0);
    buf.strokeWeight(buf.random([0.6, 1, 1.4]));
    buf.noFill();

    sq(2, 2, sz - 4);
};
