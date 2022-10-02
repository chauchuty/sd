import { WebSocket } from 'ws'
import net from 'net'
import env from './config/environments'
import GeneralPreferences from './general.preferences'

class SocketClient extends GeneralPreferences {
    private client: net.Socket
    private socket!: WebSocket

    constructor() {
        super('SocketClient')
        this.client = new net.Socket()
        
    }

    start(){
        this.logger('Inicializando...')
        this.client.connect(env.api.client.socket.port, env.api.client.socket.host, () => {
            this.logger(`Conectado ao servidor ${env.api.client.socket.host}:${env.api.client.socket.port}`)

            if (this.client) {
                this.onMessage()
                this.onClose()
            }
        })
    }


    onMessage(){
        this.client.on('data', (data) => {
            this.logger(`Mensagem recebida: ${data}`)
            if (this.socket) {
                this.socket.send(data.toString())
            }
        })
    }

    onClose(){
        this.client.on('close', () => {
            this.logger('Conexão encerrada')
        })
    }

    emit(message: Buffer, socket: WebSocket) {
        this.logger(`Mensagem enviada: ${message}`)
        this.socket = socket // Save socket
        this.client.write(message.toString())
    }
}

export default SocketClient