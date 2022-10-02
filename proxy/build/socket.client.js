"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __importDefault(require("net"));
const environments_1 = __importDefault(require("./config/environments"));
const general_preferences_1 = __importDefault(require("./general.preferences"));
class SocketClient extends general_preferences_1.default {
    constructor() {
        super('SocketClient');
        this.client = new net_1.default.Socket();
    }
    start() {
        this.logger('Inicializando...');
        this.client.connect(environments_1.default.api.client.socket.port, environments_1.default.api.client.socket.host, () => {
            this.logger(`Conectado ao servidor ${environments_1.default.api.client.socket.host}:${environments_1.default.api.client.socket.port}`);
            if (this.client) {
                this.onMessage();
                this.onClose();
            }
        });
    }
    onMessage() {
        this.client.on('data', (data) => {
            this.logger(`Mensagem recebida: ${data}`);
            if (this.socket) {
                this.socket.send(data.toString());
            }
        });
    }
    onClose() {
        this.client.on('close', () => {
            this.logger('Conexão encerrada');
        });
    }
    emit(message, socket) {
        this.logger(`Mensagem enviada: ${message}`);
        this.socket = socket; // Save socket
        this.client.write(message.toString());
    }
}
exports.default = SocketClient;
