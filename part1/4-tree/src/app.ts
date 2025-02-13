import P5 from "p5";

const sketch = (p5: P5) => {
    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };

    p5.setup = () => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        p5.noLoop();
        p5.angleMode(p5.DEGREES);
    };

    const STROKE_SCALE = 0.1;

    p5.draw = () => {
        const W = p5.windowWidth,
            H = p5.windowHeight;

        p5.noFill();
        p5.stroke(34);

        // start at the bottom of the screen
        p5.translate(W / 2, H);

        // trunk params
        const sz = H * 0.25,
            θ = p5.random(-5, 5);
        p5.strokeWeight(sz * STROKE_SCALE);

        // draw the trunk
        p5.push();
        p5.rotate(θ);
        p5.line(0, 0, 0, -sz); // draw up
        p5.translate(0, -sz); // move to top
        branch(sz);
        p5.pop();
    };

    const branch = (sz: number) => {
        // branch params
        sz *= 0.75;
        p5.strokeWeight(sz * STROKE_SCALE);

        if (sz < 3) {
            // branch too short, so stop recursion
            return;
        }

        // right (5° → 50°), left (-50° → -5°)
        const θ = p5.random(5, 50),
            θ2 = p5.random(-50, -5);

        // right branch
        p5.push();
        p5.rotate(θ);
        p5.line(0, 0, 0, -sz);
        p5.translate(0, -sz);
        branch(sz);
        p5.pop();

        // left branch
        p5.push();
        p5.rotate(θ2);
        p5.line(0, 0, 0, -sz);
        p5.translate(0, -sz);
        branch(sz);
        p5.pop();
    };

    p5.keyPressed = () => {
        if (p5.key == " ") {
            p5.clear();
            p5.redraw();
        }
    };
};

new P5(sketch);
