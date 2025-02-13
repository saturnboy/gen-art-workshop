import P5 from "p5";

type Circle = { x: number; y: number; r: number };

const sketch = (p5: P5) => {
    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };

    p5.setup = () => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        p5.noLoop();
    };

    p5.draw = () => {
        const W = p5.windowWidth,
            H = p5.windowHeight,
            rMax = p5.floor(p5.min(W, H) * p5.random([0.1, 0.15, 0.2, 0.25, 0.3])),
            rMin = 3,
            Δr = 1,
            N = 2000,
            tries = 100;

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
            if (a.x - a.r <= 0 || a.x + a.r >= W) {
                return true;
            }
            if (a.y - a.r <= 0 || a.y + a.r >= H) {
                return true;
            }
            return false;
        };

        for (let i = 0; i < N; i++) {
            for (let j = 0; j < tries; j++) {
                // circ @ random pos w/ min radius
                const x = p5.random(0 + rMin, W - rMin),
                    y = p5.random(0 + rMin, H - rMin),
                    c: Circle = { x: x, y: y, r: rMin };

                // if already collision at min radius, try again
                if (checkCircleCollision(c) || checkBoundaryCollision(c)) {
                    continue;
                }

                // min radius fits, so attempt to grow it
                while (c.r <= rMax && !checkCircleCollision(c) && !checkBoundaryCollision(c)) {
                    c.r += Δr;
                }

                // found largest circle that still fits, so add to list
                circles.push({ x: c.x, y: c.y, r: c.r - Δr * 0.5 });
                break;
            }
        }

        // draw all circles in the list
        p5.fill(255);
        p5.stroke(34);
        p5.strokeWeight(1.5);

        for (let c of circles) {
            p5.circle(c.x, c.y, c.r * 2);
        }
    };

    p5.keyPressed = () => {
        if (p5.key == " ") {
            p5.clear();
            p5.redraw();
        }
    };
};

new P5(sketch);
