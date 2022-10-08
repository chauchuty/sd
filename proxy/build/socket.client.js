"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { WebSocket } from 'ws'
const net_1 = __importDefault(require("net"));
const general_preferences_1 = __importDefault(require("./general.preferences"));
class SocketClient extends general_preferences_1.default {
    // private socket!: WebSocket
    constructor() {
        super('SocketClient');
        this.socketClient = new net_1.default.Socket();
    }
    start() {
        this.logger('Iniciado!');
        this.socketClient.connect(8082, 'localhost', () => {
            this.logger('SocketClient Conectado!');
            this.onConnection();
            this.onDisconnection();
        });
    }
    onConnection() {
        this.socketClient.on('connect', () => {
            this.logger('SocketClient Conectado!');
        });
    }
    onError() {
        this.socketClient.on('error', (error) => {
            this.logger('Erro: ' + error.message);
        });
    }
    onDisconnection() {
        this.socketClient.on('close', () => {
            this.logger('SocketClient Desconectado!');
        });
    }
}
exports.default = SocketClient;
