#! /usr/bin/env node

const { toWebSocket, toTCP } = require('../tcp-websocket-tunnel')
const program = require("commander")

program
  .requiredOption("--from <port>", "")
  .option("--tows <uri>", "")
  .option("--toport <port>", "")
  .option("--tohost <host>", "")
  .parse(process.argv)
const options = program.opts()

if (options.from)
  if (options.tows)
    toWebSocket(options.from, options.tows).on('listening', () => console.log(`TCP server listening on port ${options.from}`))
  else if (options.toport) {
    toTCP(options.from, options.toport, options.tohost)
    console.log(`WebSocket server listening on port ${options.from}`)
  }