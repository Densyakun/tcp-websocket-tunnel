const net = require('net')
const WebSocket = require('ws')
const program = require("commander")

program
    .requiredOption("--from <port>", "")
    .option("--tows <uri>", "")
    .option("--toport <port>", "")
    .option("--tohost <host>", "")
    .parse(process.argv)
const options = program.opts()

if (options.from)
    if (options.tows) {
        const server = net.createServer(c => {
            const ws = new WebSocket(options.tows)

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
        server.listen(options.from, () => {
            console.log(`TCP server listening on port ${options.from}`)
        })
    } else if (options.toport) {
        const wss = new WebSocket.WebSocketServer({ port: options.from })

        wss.on('connection', ws => {
            const client = net.connect(options.toport, options.tohost)

            client.on('data', data => ws.send(data))

            ws.on('message', data => client.write(data))

            client.on('close', () => ws.close())

            ws.on('close', () => client.destroy())
        })

        console.log(`WebSocket server listening on port ${options.from}`)
    }