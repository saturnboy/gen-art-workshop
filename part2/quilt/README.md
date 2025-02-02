# Quilt

A generated _quilt_ assembled from individual generated patches.

## Contribute a Square Patch

Import the `Patch` type from `app.ts`, and build any output you want. Any conforming TypeScript files in `src/` are considered patches.

For examples:

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

```
npm install
```

## Run

```
npm run start
```

## Test

```
pytest -v tests
```
