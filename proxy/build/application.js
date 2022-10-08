"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const general_preferences_1 = __importDefault(require("./general.preferences"));
const proxy_websocket_1 = __importDefault(require("./proxy.websocket"));
class Application extends general_preferences_1.default {
    constructor() {
        super('Application');
        this.proxyWebSocket = new proxy_websocket_1.default();
    }
    start() {
        this.logger('Iniciado!');
        this.proxyWebSocket.start();
    }
}
// Application
const application = new Application();
application.start();
