# Quilt

A generated _quilt_ assembled from individual generated patches.

## Contribute a Square Patch

Contribute your own square patch by importing the `Patch` function type from `app.ts`, exporting a function named `patch` conforming to that type, and saving your TypeScript file in `src/`.

For example, save this as `src/sqr.tx`:

```ts
import type { Patch } from "./app";

export const patch: Patch = function (buf) {
    const sz = buf.width;
    buf.noStroke();
    buf.fill(0);
    buf.square(0, 0, sz);
};
```

## Example Patches

| File     | Example Patches             |
| -------- | --------------------------- |
| `ex1.ts` | ![ex1](screenshots/ex1.png) |
| `ex2.ts` | ![ex2](screenshots/ex2.png) |
| `ex3.ts` | ![ex3](screenshots/ex3.png) |
| `ex4.ts` | ![ex4](screenshots/ex4.png) |
| `ex5.ts` | ![ex5](screenshots/ex5.png) |
| `ex6.ts` | ![ex6](screenshots/ex6.png) |
| `js1.ts` | ![js1](screenshots/js1.png) |
| `js2.ts` | ![js2](screenshots/js2.png) |
| `js3.ts` | ![js3](screenshots/js3.png) |
| `js4.ts` | ![js4](screenshots/js4.png) |

## Config

```sh
npm install
```

## Run

```sh
npm run start
```

## Test

A simple check, implemented in Python and run via Pytest, ensures that every Typescript file in `src/` has exactly this line:

```ts
export const patch: Patch = function (buf) {
```

Run the check via Pytest (you'll need to have Python 3.x and Pytest installed):

```sh
pytest -v tests
```
