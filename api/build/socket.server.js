"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __importDefault(require("net"));
const environments_1 = __importDefault(require("./config/environments"));
const general_preferences_1 = __importDefault(require("./general.preferences"));
const handle_message_1 = __importDefault(require("./handle.message"));
class SocketServer extends general_preferences_1.default {
    constructor() {
        super();
        this.server = net_1.default.createServer();
        this.handleMessage = new handle_message_1.default();
        this.handleMessage = new handle_message_1.default();
    }
    start() {
        this.logger('Iniciando Socket Server...');
        this.server.listen(environments_1.default.api.port, () => {
            this.logger(`Socket Server iniciado com sucesso: s://${environments_1.default.api.host}:${environments_1.default.api.port}`);
            this.onConnection();
        });
    }
    onConnection() {
        this.server.on('connection', (socket) => {
            this.logger('Cliente Conectado!');
            this.onMessage(socket);
            this.onClose(socket);
        });
    }
    onMessage(socket) {
        socket.on('data', (data) => {
            this.logger(`Dados recebidos: ${data.toString()}`);
            try {
                this.logger('Tratando dados recebidos...');
                this.handleMessage.handleProtocolRequest(data)
                    .then((response) => {
                    socket.write(response);
                })
                    .catch((error) => {
                    socket.write(error);
                });
            }
            catch (error) {
                this.logger('Erro ao processar a mensagem recebida!');
            }
        });
    }
    onClose(socket) {
        socket.on('close', () => {
            this.logger('Cliente desconectado!');
        });
    }
}
exports.default = SocketServer;
