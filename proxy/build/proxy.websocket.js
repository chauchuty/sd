"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const net_1 = __importDefault(require("net"));
const environments_1 = __importDefault(require("./config/environments"));
const general_preferences_1 = __importDefault(require("./general.preferences"));
class ProxyWebSocket extends general_preferences_1.default {
    constructor() {
        super('ProxyWebSocket');
    }
    start() {
        this.logger('Iniciado!');
        this.socketClient = new net_1.default.Socket();
        this.wsServer = new ws_1.WebSocketServer({ port: environments_1.default.api.server.websocket.port }, () => {
            this.logger(`Servidor WebSocket iniciado em: ws://${environments_1.default.api.server.websocket.host}:${environments_1.default.api.server.websocket.port}`);
            this.wsServer.on('connection', (socket) => {
                this.logger('WSClient Conectado!');
                // Calls SocketClient
                // this.socketClient.connect(8082, 'localhost', () => {
                //     this.logger('SocketClient Conectado!')
                // })
                // Calls WebSocket
                socket.on('message', (message) => {
                    this.logger(`Mensagem recebida: ${message}`);
                    // if (this.socketClient) {
                    //     this.socketClient.write(message.toString())
                    // }
                });
                socket.on('close', () => {
                    this.logger('WSClient Desconectado!');
                    // this.socketClient.destroy()
                });
            });
        });
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
}
exports.default = ProxyWebSocket;
