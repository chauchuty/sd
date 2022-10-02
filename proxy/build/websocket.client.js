"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __importDefault(require("net"));
const ws_1 = require("ws");
const environments_1 = __importDefault(require("./config/environments"));
const general_preferences_1 = __importDefault(require("./general.preferences"));
class WebSocketServer extends general_preferences_1.default {
    constructor() {
        super();
    }
    start() {
        this.logger('Inicializando WebSocketServer');
        if (!this.client) {
            this.logger('SocketClient não está conectado!');
            process.exit(1);
        }
        this.server = new ws_1.Server({ port: environments_1.default.api.server.websocket.port }, () => {
            this.logger(`Servidor iniciado em ${environments_1.default.api.server.websocket.host}:${environments_1.default.api.server.websocket.port}`);
            if (this.server) {
                this.onConnection();
            }
        });
    }
    setSocketClient() {
        this.client = new net_1.default.Socket();
        this.client.connect(environments_1.default.api.client.socket.port, environments_1.default.api.client.socket.host, () => {
            this.logger('Conectado ao servidor');
        });
    }
    onConnection() {
        this.server.on('connection', (socket) => {
            this.logger('Cliente conectado');
            // Events
            this.onMessage(socket);
            this.onError();
            this.onClose();
        });
    }
    onClose() {
        this.server.on('close', () => {
            this.logger('Cliente desconectado');
        });
    }
    onError() {
        this.server.on('error', (error) => {
            this.logger(`Erro: ${error}`);
        });
    }
    onMessage(socket) {
        socket.on('message', (message) => {
            this.logger(`Mensagem recebida: ${message}`);
        });
    }
    emit(socket, message) {
        // 
    }
}
exports.default = WebSocketServer;
