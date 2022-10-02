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
        super();
        this.client = new net_1.default.Socket();
    }
    start() {
        this.logger('Inicializando SocketClient');
        this.client.connect(environments_1.default.api.client.socket.port, environments_1.default.api.client.socket.host, () => {
            this.logger('Conectado ao servidor');
        });
    }
    emit(message) {
        this.client.write(message);
    }
}
exports.default = SocketClient;
