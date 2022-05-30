const net = require('net')
const WebSocket = require('ws')

// サーバーなどを返し、停止できるようにする

exports.toWebSocket = (fromPort, toAddr) => {
    const server = net.createServer(c => {
        const ws = new WebSocket(toAddr)

        c.on('end', () => ws.close(1000))

        ws.on('close', () => c.destroy())

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

        client.on('data', data => ws.send(data))

        ws.on('message', data => client.write(data))

        client.on('close', () => ws.close())

        ws.on('close', () => client.destroy())
    })

    console.log(`WebSocket server listening on port ${fromPort}`)

    return wss
}