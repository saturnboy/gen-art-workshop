import P5 from "p5";

// imports - start
import { patch as Myawesomefile } from "./Myawesomefile";
import { patch as ex_j } from "./ex_j";
import { patch as img2 } from "./img2";
import { patch as imgTest } from "./imgTest";
import { patch as redDot } from "./redDot";
import { patch as sasha } from "./sasha";
// imports - end

export type Patch = { (buf: P5.Graphics): void };

const patches: { label: string; patch: Patch }[] = [
    // patches - start
    { label: "Myawesomefile", patch: Myawesomefile },
    { label: "ex_j", patch: ex_j },
    { label: "img2", patch: img2 },
    { label: "imgTest", patch: imgTest },
    { label: "redDot", patch: redDot },
    { label: "sasha", patch: sasha },
    // patches - end
];

const sketch = (p5: P5) => {
    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };

    const delay = 60_000; // 1m
    const tick = 1000; // 1s
    let refresh = delay;

    p5.setup = () => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        p5.noLoop();

        // redraw every 1min
        setInterval(() => {
            refresh -= tick;
            if (refresh <= 0) {
                refresh = delay;
                p5.clear();
                p5.redraw();
            }
        }, tick);
    };

    p5.draw = () => {
        const w = p5.windowWidth,
            h = p5.windowHeight,
            sz = 100,
            rows = p5.floor(h / sz),
            cols = p5.floor(w / sz),
            showBg = false,
            showLbl = false;

        p5.background(255);

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const x = i * sz,
                    y = j * sz,
                    // choose a random patch
                    p = p5.random(patches);

                // draw checker board patch background?
                if (showBg) {
                    p5.fill((i + j) % 2 == 0 ? 255 : 204);
                    p5.noStroke();
                    p5.rect(x, y, sz, sz);
                }

                // create, render, and draw the patch
                const buf = p5.createGraphics(sz, sz);
                p.patch(buf);
                p5.image(buf, x, y);

                // draw label?
                if (showLbl) {
                    p5.fill(255, 100, 100);
                    p5.text(p.label, x + 4, y + sz - 4);
                }
            }
        }
    };

    p5.keyPressed = () => {
        if (p5.key == " ") {
            p5.clear();
            p5.redraw();
            refresh = delay;
        } else if (p5.key == "s") {
            p5.saveCanvas("out", "png");
        }
    };
};

new P5(sketch);
