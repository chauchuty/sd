"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const general_preferences_1 = __importDefault(require("./general.preferences"));
const web_socker_server_1 = __importDefault(require("./web.socker.server"));
const socket_client_1 = __importDefault(require("./socket.client"));
class ProxyWebSocket extends general_preferences_1.default {
    constructor() {
        super('ProxyWebSocket');
        this.mapper = new Map();
        this.webSocketServer = new web_socker_server_1.default();
    }
    start() {
        // WebSocketServer
        this.webSocketServer.onConnection(socket => {
            this.logger('Conexão WebSocket Estabelecida');
            this.subscribe(socket);
            this.webSocketServer.onMessage(socket, message => {
                this.logger(`Mensagem Recebida: ${message}`);
                const socketClient = this.mapper.get(socket);
                if (socketClient) {
                    socketClient.emit(message.toString());
                }
            });
            this.webSocketServer.onClose(socket, () => {
                this.logger('Conexão WebSocket Encerrada');
                this.unsubscribe(socket);
            });
            this.webSocketServer.onError(socket, error => {
                this.logger(`Erro: ${error.message}`);
                socket.close();
            });
        });
    }
    subscribe(socket) {
        const socketClient = new socket_client_1.default();
        socketClient.connect(() => {
            this.logger('Conexão Socket Estabelecida');
            this.logger('Quantidade Conexões: ' + this.mapper.size.toString());
            socketClient.onData(data => {
                this.logger('SocketClient: ' + data.toString());
                socket.send(data.toString());
            });
            socketClient.onClose(() => {
                this.logger('SocketClient Desconectado!');
                this.logger('Quantidade Conexões: ' + this.mapper.size.toString());
            });
            socketClient.onError(error => {
                this.logger('SocketClient Erro: ' + error.message);
            });
        });
        this.mapper.set(socket, socketClient);
    }
    unsubscribe(socket) {
        const socketClient = this.mapper.get(socket);
        if (socketClient) {
            socketClient.disconnect();
            this.mapper.delete(socket);
        }
    }
}
exports.default = ProxyWebSocket;
