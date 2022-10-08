import net from 'net'
import GeneralPreferences from './general.preferences'
import env from './config/environments'
import { WebSocket } from 'ws'

class SocketClient extends GeneralPreferences {
    private socketClient!: net.Socket
    private socketTmp!: WebSocket

    constructor(){
        super('SocketClient')
        
        this.socketClient = new net.Socket()
    }

    connect(callback: () => void) {
        this.socketClient.connect(env.api.client.socket.port, env.api.client.socket.host, () => {
            this.logger(`Conexão SocketClient Estabelecida: ${env.api.client.socket.host}:${env.api.client.socket.port}`)
            callback()
        })
    }

    onData(callback: (data: Buffer) => void){
        this.socketClient.on('data', callback)
    }

    onError(callback: (error: Error) => void){
        this.socketClient.on('error', callback)
    }
    
    onClose(callback: () => void){
        this.socketClient.on('close', callback)
    }

    emit(socket: WebSocket, message: string){
        this.socketTmp = socket // Socket Temp
        this.socketClient.write(message)
    }

    disconnect(){
        this.socketClient.destroy()
    }

    socketTempEmit(message: string){
        this.socketTmp.send(message)
    }
}

export default SocketClient


// import { WebSocket } from 'ws'
// import net from 'net'
// import env from './config/environments'
// import GeneralPreferences from './general.preferences'

// class SocketClient extends GeneralPreferences {
//     public socketClient: net.Socket
//     // private socket!: WebSocket

//     constructor() {
//         super('SocketClient')
//         this.socketClient = new net.Socket()
//     }

//     start(){
//         this.logger('Iniciado!')
//         this.socketClient.connect(8082, 'localhost', () => {
//             this.logger('SocketClient Conectado!')

//             this.onConnection()
//             this.onDisconnection()
//         })
//     }

//     onConnection(){
//         this.socketClient.on('connect', () => {
//             this.logger('SocketClient Conectado!')
//         })
//     }
    
//     onError(){
//         this.socketClient.on('error', (error: Error) => {
//             this.logger('Erro: ' + error.message)
//         })
//     }

//     onDisconnection(){
//         this.socketClient.on('close', () => {
//             this.logger('SocketClient Desconectado!')
//         })
//     }


//     // onMessage(){
//     //     this.client.on('data', (data) => {
//     //         this.logger(`Mensagem recebida: ${data}`)
//     //         if (this.socket) {
//     //             this.socket.send(data.toString())
//     //         }
//     //     })
//     // }

//     // onClose(){
//     //     this.client.on('close', () => {
//     //         this.logger('Conexão encerrada')
//     //     })
//     // }

//     // emit(message: Buffer, socket: WebSocket) {
//     //     this.logger(`Mensagem enviada: ${message}`)
//     //     this.socket = socket // Save socket
//     //     this.client.write(message.toString())
//     // }
// }

// export default SocketClient