# tcp-websocket-tunnel

Simple tunneling server between TCP and WebSocket

For using on shell:

```bash
npm install -g tcp-websocket-tunnel
```

For use module:

```bash
npm install tcp-websocket-tunnel
```

## Listen on TCP server Port 25565, destination to ws://localhost:8080

Shell:

```bash
tcp-websocket-tunnel --from 25565 --tows ws://localhost:8080
```

Module:

```js
const { toWebSocket } = require('../tcp-websocket-tunnel')

toWebSocket(25565, 'ws://localhost:8080')
```

## Listen on WebSocket server Port 8080, destination to TCP localhost:25565

Shell:

```bash
tcp-websocket-tunnel --from 8080 --toport 25565 --tohost localhost
```

Module:

```js
const { toTCP } = require('../tcp-websocket-tunnel')

toTCP(8080, 25565, 'localhost')
```
