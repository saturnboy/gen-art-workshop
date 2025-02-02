import P5 from "p5";

// imports - start
import { patch as ex1 } from "./ex1";
import { patch as ex2 } from "./ex2";
import { patch as ex3 } from "./ex3";
import { patch as ex4 } from "./ex4";
import { patch as ex5 } from "./ex5";
import { patch as ex6 } from "./ex6";
import { patch as js1 } from "./js1";
import { patch as js2 } from "./js2";
import { patch as js3 } from "./js3";
import { patch as js4 } from "./js4";
// imports - end

export type Patch = { (buf: P5.Graphics): void };

const patches: { label: string; patch: Patch }[] = [
    // patches - start
    { label: "ex1", patch: ex1 },
    { label: "ex2", patch: ex2 },
    { label: "ex3", patch: ex3 },
    { label: "ex4", patch: ex4 },
    { label: "ex5", patch: ex5 },
    { label: "ex6", patch: ex6 },
    { label: "js1", patch: js1 },
    { label: "js2", patch: js2 },
    { label: "js3", patch: js3 },
    { label: "js4", patch: js4 },
    // patches - end
];

const sketch = (p5: P5) => {
    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };

    p5.setup = () => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        p5.noLoop();
    };

    p5.draw = () => {
        const w = p5.windowWidth,
            h = p5.windowHeight,
            sz = 100,
            rows = p5.floor(h / sz),
            cols = p5.floor(w / sz),
            showBg = false,
            showLbl = false;

        console.log(`quilt: ${w}⨉${h} → ${rows}⨉${cols}`);

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const x = i * sz,
                    y = j * sz,
                    // choose a random patch
                    p = p5.random(patches);

                // draw background
                if (showBg) {
                    p5.fill((i + j) % 2 == 0 ? 255 : 204);
                    p5.noStroke();
                    p5.rect(x, y, sz, sz);
                }

                // create, render, and draw the patch
                const buf = p5.createGraphics(sz, sz);
                p.patch(buf);
                p5.image(buf, x, y);

                // draw label
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
        }
    };
};

new P5(sketch);