# tcp-websocket-tunnel

Simple tunneling server between TCP and WebSocket.

About use node module:
- Listening for server start.
- You can stop server at any time.
- You can't get a connecting sockets.

## Install

For using on shell:

```bash
npm install -g tcp-websocket-tunnel
```

For use node module:

```bash
npm install tcp-websocket-tunnel
```

## Listen on TCP server Port 25565, destination to ws://localhost:8080

Shell:

```bash
tcp-websocket-tunnel --from 25565 --tows ws://localhost:8080
```

Node module:

```js
const { toWebSocket } = require('tcp-websocket-tunnel')

const server = toWebSocket(25565, 'ws://localhost:8080')
server.on('listening', () => {
    console.log('listening')

    // Any code

    server.close()
})
```

## Listen on WebSocket server Port 8080, destination to TCP localhost:25565

Shell:

```bash
tcp-websocket-tunnel --from 8080 --toport 25565 --tohost localhost
```

Node module:

```js
const { toTCP } = require('tcp-websocket-tunnel')

const wss = toTCP(8080, 25565, 'localhost')
console.log('listening')

// Any code

wss.close()
```

Node module (Use in express-ws):

```js
const express = require('express')
const app = express()
const expressWs = require('express-ws')(app)
const { toTCPOnConnection } = require('tcp-websocket-tunnel')

app.ws('/ws', (ws, req) => toTCPOnConnection(ws, 25565, 'localhost'))

app.listen(process.env.PORT || 3000)
```

Node module (Use in @fastify/websocket):

```js
const fastify = require('fastify')()
fastify.register(require('@fastify/websocket'))
const { toTCPOnConnection } = require('tcp-websocket-tunnel')

fastify.register(async (fastify) => {
  fastify.get('/ws', { websocket: true }, (connection, req) => {
    toTCPOnConnection(connection.socket, 25565, 'localhost')
  })
})

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3000, '0.0.0.0')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
```
