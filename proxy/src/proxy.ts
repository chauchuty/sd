import net from 'net'
import { Server } from 'ws'

// class Api {
//     private client: net.Socket

//     constructor() {
//         this.client = new net.Socket()
        
//         this.client.on('data', (data) => {
//             console.log(data.toString())
//         })
    

//         this.client.connect(8089, '51.81.87.67', () => {
//             const params = {
//                 operation: 'login',
//                 params: {
//                     ra: "9999999",
//                     senha: "123"
//                 }
//             }
//             this.client.emit(JSON.stringify(params))
//         })
//     }
// }

class Proxy {
    private server: Server

    constructor() {
        this.server = new Server({ port: 8081 })

        this.server.on('connection', (socket) => {
            console.log('Cliente Conectado!')
            socket.on('message', (message) => {
                console.log(JSON.parse(message.toString()))
                socket.send(message.toString())
                socket.emit(message.toString())
            })
        })
    }
}

// Application
const proxy = new Proxy()
// const api = new Api()
