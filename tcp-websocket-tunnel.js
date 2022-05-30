const net = require('net')
const WebSocket = require('ws')

exports.toWebSocket = (fromPort, toAddr) => {
    const server = net.createServer(c => {
        const ws = new WebSocket(toAddr)

        ws.on('close', () => c.destroy())

        ws.on('error', () => c.destroy())

        c.on('end', () => ws.close(1000))

        c.on('error', () => ws.close(1000))

        ws.on('open', () => c.on('data', data => ws.send(data)))

        ws.on('message', data => {
            if (!c.destroyed)
                c.write(data)
        })
    })

    server.on('error', (err) => {
        throw err
    })
    server.listen(fromPort, () => {
        console.log(`TCP server listening on port ${fromPort}`)
    })

    return server
}

exports.toTCP = (fromPort, toPort, toHost) => {
    const wss = new WebSocket.WebSocketServer({ port: fromPort })

    wss.on('connection', ws => {
        const client = net.connect(toPort, toHost)

        client.on('end', () => ws.close(1000))

        client.on('error', () => ws.close(1000))

        ws.on('close', () => client.destroy())

        ws.on('error', () => client.destroy())

        ws.on('message', data => client.write(data))

        client.on('data', data => ws.send(data))
    })

    console.log(`WebSocket server listening on port ${fromPort}`)

    return wss
}