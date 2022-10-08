import GeneralPreferences from './general.preferences'
import WebSocketServer from './web.socker.server'
import SocketClient from './socket.client'

class ProxyWebSocket extends GeneralPreferences {
    private webSocketServer!: WebSocketServer
    private socketClient!: SocketClient

    constructor() {
        super('ProxyWebSocket')

        this.webSocketServer = new WebSocketServer()
        this.socketClient = new SocketClient()
    }

    start() {
        // SocketClient
        this.socketClient.connect(() => {

            this.socketClient.onData((data) => {
                this.logger('SocketClient: ' + data.toString())
                this.socketClient.socketTmp.send(data.toString())
            })

            this.socketClient.onClose(() => {
                this.logger('SocketClient Desconectado!')
            })

            this.socketClient.onError((error) => {
                this.logger('SocketClient Erro: ' + error.message)
            })
        })

        // WebSocketServer
        this.webSocketServer.onConnection(socket => {
            this.logger('Conexão WebSocket Estabelecida')

            this.webSocketServer.onMessage(socket, message => {
                this.logger(`Mensagem Recebida: ${message}`)
                this.socketClient.emit(socket, message.toString())
            })

            this.webSocketServer.onClose(socket, () => {
                this.logger('Conexão WebSocket Encerrada')
                console.log(this.webSocketServer.getCountListeners())
            })

            this.webSocketServer.onError(socket, error => {
                this.logger(`Erro: ${error.message}`)
                socket.close()
            })
        })
    }
}

export default ProxyWebSocket