# tcp-websocket-tunnel

Simple tunneling server between TCP and WebSocket

```bash
npm install -g tcp-websocket-tunnel
```

open TCP 25565 to WebSocket 8080 server:

```bash
tcp-websocket-tunnel --from 25565 --tows ws://localhost:8080
```

open WebSocket to TCP server:

```bash
tcp-websocket-tunnel --from 8080 --toport 25565 --tohost localhost
```
