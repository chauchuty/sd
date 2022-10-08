import ws from 'ws'
import GeneralPreferences from './general.preferences'
import env from './config/environments'

class WebSocketServer extends GeneralPreferences {
    private wsServer!: ws.WebSocketServer

    constructor(){
        super('WebSocketServer')
        
        this.wsServer = new ws.Server({ port: env.api.server.websocket.port }, () => {
            this.logger(`Servidor WebSocket Inicializado: ws://${env.api.server.websocket.host}:${env.api.server.websocket.port}`)
        })

        this.wsServer.setMaxListeners(1) // Infinity
    }

    onConnection(callback: (socket: ws) => void){
        this.wsServer.on('connection', callback)
    }

    onMessage(socket: ws, callback: (message: ws.Data) => void){
        socket.on('message', callback)
    }

    onClose(socket: ws, callback: () => void){
        socket.on('close', callback)
    }

    onError(socket: ws, callback: (error: Error) => void){
        socket.on('error', callback)
    }

    emit(socket: ws, message: string){
        socket.send(message)
    }

    getCountListeners(){
        return this.wsServer.listenerCount('connection')
    }
}

export default WebSocketServer