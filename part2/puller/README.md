# Puller

A simple [ts-node](https://typestrong.org/ts-node/) server that listens for
GitHub webhooks sent to its `/webhook` endpoint by a successful merge to
`main`. It will then re-pull the repo, updating all the code.
Any file changes, when combined with filesystem watcher like
[nodemon](https://nodemon.io), will trigger an app refresh, creating a local
_live_ view of the [Quilt](../quilt).

## Config

```sh
npm install
```

## Run

```sh
npm start
```

The server will start on default port `3000` and listen for `POST` requests to the `/webhook` endpoint.

## Local Testing

Test it with [HTTPie](https://httpie.io) like this:

```sh
http :3000/webhook key=val
```
