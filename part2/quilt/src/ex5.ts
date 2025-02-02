import type { Patch } from "./app";

export const patch: Patch = function (buf) {
    const sz = buf.width,
        rMax = sz * buf.random([0.15, 0.2, 0.25, 0.3]),
        rMin = buf.random([2, 2.5, 3, 3.5]),
        rStep = rMin * 0.2,
        n = 50,
        tries = 500;

    type Circle = { x: number; y: number; r: number };
    let circles: Circle[] = [];

    // helper to check for circle-to-circle collision
    const checkCircleCollision = (a: Circle): Boolean => {
        for (let c of circles) {
            const r = a.r + c.r,
                Δx = a.x - c.x,
                Δy = a.y - c.y,
                Δsquared = Δx * Δx + Δy * Δy,
                rsquared = r * r;
            if (Δsquared < rsquared) {
                return true;
            }
        }
        return false;
    };

    // helper to check for circle-to-boundary collision
    const checkBoundaryCollision = (a: Circle): Boolean => {
        if (a.x - a.r <= 0 || a.x + a.r >= sz) {
            return true;
        }
        if (a.y - a.r <= 0 || a.y + a.r >= sz) {
            return true;
        }
        return false;
    };

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < tries; j++) {
            // random pos + min radius
            const x = buf.random(1 + rMin, sz - rMin - 1),
                y = buf.random(1 + rMin, sz - rMin - 1),
                c: Circle = { x: x, y: y, r: rMin };

            // if already collision at min radius, try again
            if (checkCircleCollision(c) || checkBoundaryCollision(c)) {
                continue;
            }

            // min radius fits, so attempt to grow it
            while (c.r <= rMax && !checkCircleCollision(c) && !checkBoundaryCollision(c)) {
                c.r += rStep;
            }

            // found largest circle that still fits, so add to list
            circles.push({ x: c.x, y: c.y, r: c.r - rStep * 0.5 });
            break;
        }
    }

    // draw all circles in the list
    const r = buf.random();

    if (r < 0.5) {
        buf.fill(0);
        buf.noStroke();
    } else {
        buf.noFill();
        buf.stroke(buf.random([0.5, 0.75, 1, 1.25]));
    }

    for (let c of circles) {
        buf.circle(c.x, c.y, c.r * 2);
    }
};
