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
