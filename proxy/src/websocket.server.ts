import { Server, WebSocket } from 'ws'
import env from './config/environments'
import GeneralPreferences from './general.preferences'
import SocketClient from './socket.client'

class WebSocketServer extends GeneralPreferences {
    private server!: Server
    private client!: SocketClient

    constructor() {
        super('WebSocketServer')
    }

    start() {
        this.logger('Inicializando...')

        this.server = new Server({ port: env.api.server.websocket.port }, () => {
            this.logger(`Servidor iniciado em ${env.api.server.websocket.host}:${env.api.server.websocket.port}`)

            this.client = new SocketClient()
            this.client.start()

            if (this.server && this.client) {
                this.onConnection()
            }
        })
    }

    private onConnection() {
        this.server.on('connection', (socket) => {
            this.logger('Cliente conectado')

            // WebSocket
            this.onMessage(socket)
            this.onError()
            this.onClose()
        })
    }

    private onClose() {
        this.server.on('close', () => {
            this.logger('Cliente desconectado')
        })
    }

    private onError() {
        this.server.on('error', (error) => {
            this.logger(`Erro: ${error}`)
        })
    }

    private onMessage(socket: WebSocket) {
        socket.on('message', (message: Buffer) => {
            this.logger(`Mensagem recebida: ${message}`)
            this.client.emit(message, socket)
        })
    }

    private emit(socket: WebSocket, message: Buffer) {
        this.logger(`Mensagem enviada: ${message}`)
        socket.send(message.toString())
    }
}

export default WebSocketServer