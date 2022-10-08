// import { WebSocket } from 'ws'
import net from 'net'
import env from './config/environments'
import GeneralPreferences from './general.preferences'

class SocketClient extends GeneralPreferences {
    public socketClient: net.Socket
    // private socket!: WebSocket

    constructor() {
        super('SocketClient')
        this.socketClient = new net.Socket()
    }

    start(){
        this.logger('Iniciado!')
        this.socketClient.connect(8082, 'localhost', () => {
            this.logger('SocketClient Conectado!')

            this.onConnection()
            this.onDisconnection()
        })
    }

    onConnection(){
        this.socketClient.on('connect', () => {
            this.logger('SocketClient Conectado!')
        })
    }
    
    onError(){
        this.socketClient.on('error', (error: Error) => {
            this.logger('Erro: ' + error.message)
        })
    }

    onDisconnection(){
        this.socketClient.on('close', () => {
            this.logger('SocketClient Desconectado!')
        })
    }


    // onMessage(){
    //     this.client.on('data', (data) => {
    //         this.logger(`Mensagem recebida: ${data}`)
    //         if (this.socket) {
    //             this.socket.send(data.toString())
    //         }
    //     })
    // }

    // onClose(){
    //     this.client.on('close', () => {
    //         this.logger('Conexão encerrada')
    //     })
    // }

    // emit(message: Buffer, socket: WebSocket) {
    //     this.logger(`Mensagem enviada: ${message}`)
    //     this.socket = socket // Save socket
    //     this.client.write(message.toString())
    // }
}

export default SocketClient