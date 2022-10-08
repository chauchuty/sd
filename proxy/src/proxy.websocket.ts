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

        // this.wsServer.on('connection', (socket) => {
        //     this.logger('Cliente Conectado!')
        // })
        // this.wsServer = new ws.Server({ port: env.api.server.websocket.port }, () => {
        //     this.logger('WSServer Inicializado!')

        //     // WebSocket Server
        //     this.onConnection()

        //     // SocketClient
        //     this.socketClient = new SocketClient()
            
        // })
    }
    
    // onDisconnection(socket: ws){
    //     socket.on('close', () => {
    //         this.logger('WSClient Desconectado!')
    //         this.socketClient.socketClient.destroy()
    //     })
    // }
    


    // onMessage(socket: ws){
    //     socket.on('message', (message: string) => {
    //         this.logger('Mensagem Recebida: ' + message)
    //     })
    // }

   
    

    // private server!: Server
    // private client!: SocketClient

    // constructor() {
    //     super('ProxyWebSocket')
    // }

    // start() {
    //     this.logger('Inicializando...')

    //     this.server = new Server({ port: env.api.server.websocket.port }, () => {
    //         this.logger(`Servidor iniciado em ${env.api.server.websocket.host}:${env.api.server.websocket.port}`)

    //         if (this.server) {
    //             this.startClient()
    //             if (this.client) {
    //                 this.onConnection()
    //             }
    //         }
    //     })
    // }

    // private startClient() {
    //     this.client = new SocketClient()
    //     this.client.start()
    // }

    // private onConnection() {
    //     this.server.on('connection', (socket, request) => {
    //         this.logger(`Conexão estabelecida: ${request.socket.remoteAddress}:${request.socket.remotePort}`)
            
    //         this.onMessage(socket)
    //         this.onClose(socket)
    //         this.onError(socket)
    //     })
        
    // }

    // private onClose(socket: WebSocket) {
    //     socket.on('close', () => {
    //         this.logger(`Conexão encerrada`)
    //     })
    // }

    // private onError(socket: WebSocket) {
    //     socket.on('error', (error) => {
    //         this.logger(`Erro: ${error}`)
    //     })
    // }

    // private onMessage(socket: WebSocket) {
    //     socket.on('message', (message: Buffer) => {
    //         this.logger(`Mensagem recebida: ${message}`)
    //         this.client.emit(message, socket)
    //     })
    // }

    // private emit(socket: WebSocket, message: string) {
    //     this.logger(`Mensagem enviada: ${message}`)
    //     socket.send(message)
    // }
}

export default ProxyWebSocket