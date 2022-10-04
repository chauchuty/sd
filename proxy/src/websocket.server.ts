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

            if (this.server) {
                this.startClient()
                if (this.client) {
                    this.onConnection()
                }
            }
        })
    }

    private startClient() {
        this.client = new SocketClient()
        this.client.start()
    }

    private onConnection() {
        this.server.on('connection', (socket, request) => {
            this.logger(`Conexão estabelecida: ${request.socket.remoteAddress}:${request.socket.remotePort}`)
            
            this.onMessage(socket)
            this.onClose(socket)
            this.onError(socket)
        })
        
    }

    private onClose(socket: WebSocket) {
        socket.on('close', () => {
            this.logger(`Conexão encerrada`)
        })
    }

    private onError(socket: WebSocket) {
        socket.on('error', (error) => {
            this.logger(`Erro: ${error}`)
        })
    }

    private onMessage(socket: WebSocket) {
        socket.on('message', (message: Buffer) => {
            this.logger(`Mensagem recebida: ${message}`)
            this.client.emit(message, socket)
        })
    }

    private emit(socket: WebSocket, message: string) {
        this.logger(`Mensagem enviada: ${message}`)
        socket.send(message)
    }
}

export default WebSocketServer