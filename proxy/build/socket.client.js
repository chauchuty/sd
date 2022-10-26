"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __importDefault(require("net"));
const general_preferences_1 = __importDefault(require("./general.preferences"));
const environments_1 = __importDefault(require("./config/environments"));
class SocketClient extends general_preferences_1.default {
    // private socketTmp!: WebSocket
    constructor() {
        super('SocketClient');
        this.socketClient = new net_1.default.Socket();
    }
    connect(callback) {
        this.socketClient.connect(environments_1.default.api.client.socket.port, environments_1.default.api.client.socket.host, () => {
            this.logger(`Conexão SocketClient Estabelecida: ${environments_1.default.api.client.socket.host}:${environments_1.default.api.client.socket.port}`);
            callback();
        });
    }
    onData(callback) {
        this.socketClient.on('data', callback);
    }
    onError(callback) {
        this.socketClient.on('error', callback);
    }
    onClose(callback) {
        this.socketClient.on('close', callback);
    }
    emit(message) {
        this.socketClient.write(message);
    }
    socketEmit(socket, message) {
        socket.send(message);
    }
    disconnect() {
        this.socketClient.destroy();
    }
}
exports.default = SocketClient;
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
