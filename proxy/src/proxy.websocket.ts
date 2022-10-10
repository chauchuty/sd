import GeneralPreferences from './general.preferences'
import WebSocketServer from './web.socker.server'
import SocketClient from './socket.client'
import { WebSocket } from 'ws'

class ProxyWebSocket extends GeneralPreferences {
    private webSocketServer!: WebSocketServer
    private mapper = new Map<WebSocket, SocketClient>()

    constructor() {
        super('ProxyWebSocket')
        this.webSocketServer = new WebSocketServer()
    }

    start() {
        // WebSocketServer
        this.webSocketServer.onConnection(socket => {
            this.logger('Conexão WebSocket Estabelecida')

            this.subscribe(socket)

            this.webSocketServer.onMessage(socket, message => {
                this.logger(`Mensagem Recebida: ${message}`)
                const socketClient = this.mapper.get(socket)
                if (socketClient) {
                    socketClient.emit(message.toString())
                }
            })

            this.webSocketServer.onClose(socket, () => {
                this.logger('Conexão WebSocket Encerrada')
                this.unsubscribe(socket)
            })

            this.webSocketServer.onError(socket, error => {
                this.logger(`Erro: ${error.message}`)
                socket.close()
            })
        })
    }

    private subscribe(socket: WebSocket) {
        const socketClient = new SocketClient()
        socketClient.connect(() => {
            socketClient.onData(data => {
                this.logger('SocketClient: ' + data.toString())
                socket.send(data.toString())
            })

            socketClient.onClose(() => {
                this.logger('SocketClient Desconectado!')
            })

            socketClient.onError(error => {
                this.logger('SocketClient Erro: ' + error.message)
            })
        })
        this.mapper.set(socket, socketClient)
    }

    private unsubscribe(socket: WebSocket) {
        const socketClient = this.mapper.get(socket)
        if (socketClient) {
            socketClient.disconnect()
            this.mapper.delete(socket)
        }
    }
}

export default ProxyWebSocket