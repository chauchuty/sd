import { WebSocketServer } from 'ws'
import net from 'net'
import env from './config/environments'
import GeneralPreferences from './general.preferences'

class ProxyWebSocket extends GeneralPreferences {
    private wsServer!: WebSocketServer
    private socketClient!: net.Socket 

    constructor(){
        super('ProxyWebSocket')
    }

    start(){
        this.logger('Iniciado!')

        this.socketClient = new net.Socket()

        this.wsServer = new WebSocketServer({ port: env.api.server.websocket.port }, () => {
            this.logger(`Servidor WebSocket iniciado em: ws://${env.api.server.websocket.host}:${env.api.server.websocket.port}`)

            this.wsServer.on('connection', (socket) => {
                this.logger('WSClient Conectado!')

                // Calls WebSocket
                socket.on('message', (message) => {
                    this.logger(`[WebSocketServer] Mensagem recebida: ${message}`)
                    
                    if (this.socketClient) {
                        this.socketClient.write(message.toString())
                    }
                })

                socket.on('close', () => {
                    this.logger('WSClient Desconectado!')
                    this.socketClient.destroy()
                })

                // // Calls SocketClient
                this.socketClient.connect(env.api.client.socket.port, env.api.client.socket.host, () => {
                    this.logger('SocketClient Conectado!')

                    this.socketClient.on('data', (data) => {
                        this.logger(`[SocketCliente] Mensagem recebida: ${data}`)
                        socket.send(data.toString())
                    })

                    this.socketClient.on('close', () => {
                        this.logger('SocketClient Desconectado!')
                    })
                })   
            })
        })
    }
}

export default ProxyWebSocket