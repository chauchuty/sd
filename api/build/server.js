"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __importDefault(require("net"));
const environments_1 = __importDefault(require("./config/environments"));
class GeneralPreferences {
    logger(message) {
        console.log(`[${new Date().toLocaleTimeString()}] - ${message}`);
    }
}
class SocketServer extends GeneralPreferences {
    constructor() {
        super();
        this.server = net_1.default.createServer();
    }
    start() {
        this.logger('Iniciando Socket Server...');
        this.server.listen(environments_1.default.api.port, () => {
            this.logger(`Socket Server iniciado com sucesso: s://${environments_1.default.api.host}:${environments_1.default.api.port}`);
            this.server.on('connection', (socket) => {
                this.logger('Cliente Conectado!');
                socket.on('data', (data) => {
                    this.logger(`Dados recebidos: ${data.toString()}`);
                });
            });
        });
    }
    emit() { }
    onError() { }
    disconnect() { }
}
class Application extends GeneralPreferences {
    constructor() {
        super();
        this.socketServer = new SocketServer();
    }
    start() {
        this.logger('Iniciando Aplicação!');
        this.socketServer.start();
    }
}
// Main
const app = new Application();
app.start();
