import type { Patch } from "./app";

const STROKE_SCALE = 0.1;
const TRUNK_SCALE = 0.2;
const BRANCH_SCALE = 0.65;

export const patch: Patch = function (buf) {
    const sz = buf.width,
        r = buf.random(),
        s = buf.random(0.9, 1.1),
        Δ = buf.PI * 0.13;

    buf.stroke(0);
    buf.noFill();
    buf.angleMode(buf.RADIANS);

    const branch = (l: number, θ: number, Δ: number) => {
        buf.strokeWeight(l * STROKE_SCALE);

        if (l < 8) {
            // branch too short, so stop recursions
            return;
        }

        const θb = buf.randomGaussian(θ, Δ),
            Δb = Δ * BRANCH_SCALE,
            r = buf.random(),
            s = buf.random(0.95, 1.05);

        buf.push();
        buf.rotate(θb);
        buf.line(0, 0, 0, -l);
        buf.translate(0, -l);

        if (r < 0.1) {
            branch(l * BRANCH_SCALE * s, -Δ * 1.5, Δb);
            branch(l * BRANCH_SCALE * s, Δ * 1.5, Δb);
        } else if (r < 0.25) {
            branch(l * BRANCH_SCALE * s, -Δ * 1.5, Δb);
            branch(l * BRANCH_SCALE * s, 0, Δb);
            branch(l * BRANCH_SCALE * s, Δ * 1.5, Δb);
        } else if (r < 0.45) {
            branch(l * BRANCH_SCALE * s, -Δ * 2, Δb);
            branch(l * BRANCH_SCALE * s, -Δ, Δb);
            branch(l * BRANCH_SCALE * s, Δ, Δb);
            branch(l * BRANCH_SCALE * s, Δ * 2, Δb);
        } else if (r < 0.7) {
            branch(l * BRANCH_SCALE * s, -Δ * 2, Δb);
            branch(l * BRANCH_SCALE * s, -Δ, Δb);
            branch(l * BRANCH_SCALE * s, 0, Δb);
            branch(l * BRANCH_SCALE * s, Δ, Δb);
            branch(l * BRANCH_SCALE * s, Δ * 2, Δb);
        } else {
            branch(l * BRANCH_SCALE * s, -Δ * 3, Δb);
            branch(l * BRANCH_SCALE * s, -Δ * 2, Δb);
            branch(l * BRANCH_SCALE * s, -Δ, Δb);
            branch(l * BRANCH_SCALE * s, Δ, Δb);
            branch(l * BRANCH_SCALE * s, Δ * 2, Δb);
            branch(l * BRANCH_SCALE * s, Δ * 3, Δb);
        }

        buf.pop();
    };

    // trunk
    buf.translate(sz * 0.5, sz * 0.5);

    if (r < 0.1) {
        branch(sz * TRUNK_SCALE * s, 0, Δ);
        branch(sz * TRUNK_SCALE * s, buf.PI * 0.6667, Δ);
        branch(sz * TRUNK_SCALE * s, buf.PI * 1.3333, Δ);
    } else if (r < 0.25) {
        branch(sz * TRUNK_SCALE * s, 0, Δ);
        branch(sz * TRUNK_SCALE * s, buf.PI * 0.5, Δ);
        branch(sz * TRUNK_SCALE * s, buf.PI, Δ);
        branch(sz * TRUNK_SCALE * s, buf.PI * 1.5, Δ);
    } else if (r < 0.45) {
        branch(sz * TRUNK_SCALE * s, 0, Δ);
        branch(sz * TRUNK_SCALE * s, buf.PI * 0.4, Δ);
        branch(sz * TRUNK_SCALE * s, buf.PI * 0.8, Δ);
        branch(sz * TRUNK_SCALE * s, buf.PI * 1.2, Δ);
        branch(sz * TRUNK_SCALE * s, buf.PI * 1.6, Δ);
    } else if (r < 0.7) {
        branch(sz * TRUNK_SCALE * s, 0, Δ);
        branch(sz * TRUNK_SCALE * s, buf.PI * 0.3333, Δ);
        branch(sz * TRUNK_SCALE * s, buf.PI * 0.6667, Δ);
        branch(sz * TRUNK_SCALE * s, buf.PI, Δ);
        branch(sz * TRUNK_SCALE * s, buf.PI * 1.3333, Δ);
        branch(sz * TRUNK_SCALE * s, buf.PI * 1.6667, Δ);
    } else {
        branch(sz * TRUNK_SCALE * s, 0, Δ);
        branch(sz * TRUNK_SCALE * s, buf.PI * 0.2857, Δ);
        branch(sz * TRUNK_SCALE * s, buf.PI * 0.5714, Δ);
        branch(sz * TRUNK_SCALE * s, buf.PI * 0.8571, Δ);
        branch(sz * TRUNK_SCALE * s, buf.PI * 1.1429, Δ);
        branch(sz * TRUNK_SCALE * s, buf.PI * 1.4286, Δ);
        branch(sz * TRUNK_SCALE * s, buf.PI * 1.7143, Δ);
    }
};
