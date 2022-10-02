"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const websocket_server_1 = __importDefault(require("./websocket.server"));
const general_preferences_1 = __importDefault(require("./general.preferences"));
class Proxy extends general_preferences_1.default {
    constructor() {
        super('Proxy');
        this.webSocketServer = new websocket_server_1.default();
    }
    start() {
        this.logger('Inicializado');
        this.webSocketServer.start();
    }
}
// Application
const proxy = new Proxy();
proxy.start();
