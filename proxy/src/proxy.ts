import { Server } from 'ws'

class Proxy {
    private server: Server

    constructor() {
        this.server = new Server({ port: 8081 })

        this.server.on('connection', (socket) => {
            console.log('Cliente Conectado!')
            socket.on('message', (message) => {
                socket.send(message.toString())
            })
        })
    }
}

// Application
const proxy = new Proxy()
