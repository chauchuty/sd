"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const environments_1 = __importDefault(require("./config/environments"));
const general_preferences_1 = __importDefault(require("./general.preferences"));
const socket_client_1 = __importDefault(require("./socket.client"));
class WebSocketServer extends general_preferences_1.default {
    constructor() {
        super('WebSocketServer');
    }
    start() {
        this.logger('Inicializando...');
        this.server = new ws_1.Server({ port: environments_1.default.api.server.websocket.port }, () => {
            this.logger(`Servidor iniciado em ${environments_1.default.api.server.websocket.host}:${environments_1.default.api.server.websocket.port}`);
            if (this.server) {
                this.startClient();
                if (this.client) {
                    this.onConnection();
                }
            }
        });
    }
    startClient() {
        this.client = new socket_client_1.default();
        this.client.start();
    }
    onConnection() {
        this.server.on('connection', (socket) => {
            this.logger('Cliente conectado');
            this.emit(socket, 'Conectado ao servidor');
            // WebSocket
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
            this.client.emit(message, socket);
        });
    }
    emit(socket, message) {
        this.logger(`Mensagem enviada: ${message}`);
        socket.send(message);
    }
}
exports.default = WebSocketServer;
