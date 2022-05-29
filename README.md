# tcp-websocket-tunnel

Simple tunneling server between TCP and WebSocket

```bash
npm install -g tcp-websocket-tunnel
```

listen on TCP server Port 25565, destination to ws://localhost:8080:

```bash
tcp-websocket-tunnel --from 25565 --tows ws://localhost:8080
```

listen on WebSocket server Port 8080, destination to TCP localhost:25565:

```bash
tcp-websocket-tunnel --from 8080 --toport 25565 --tohost localhost
```
