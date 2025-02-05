# 10print

The classic C64 one-liner maze art.

```basic
10 PRINT CHR$(205.5+RND(1)); : GOTO 10
```

Which prints the [PETSCII](https://sta.c64.org/cbm64pet.html) code 205 (for backslash `\`) or 206 (for forward slash `/`) at random, forever.

## Screenshots

|                             |                             |                             |
| --------------------------- | --------------------------- | --------------------------- |
| ![](screenshots/out-01.png) | ![](screenshots/out-02.png) | ![](screenshots/out-03.png) |
| ![](screenshots/out-04.png) | ![](screenshots/out-05.png) | ![](screenshots/out-06.png) |
| ![](screenshots/out-07.png) | ![](screenshots/out-08.png) | ![](screenshots/out-09.png) |

## Config

```
npm install
```

## Run

```
npm start
```
