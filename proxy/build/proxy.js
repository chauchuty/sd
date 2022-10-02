"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const websocket_client_1 = __importDefault(require("./websocket.client"));
const general_preferences_1 = __importDefault(require("./general.preferences"));
class Proxy extends general_preferences_1.default {
    // private socketClient: SocketClient
    constructor() {
        super();
        this.webSocketServer = new websocket_client_1.default();
        // this.socketClient = new SocketClient()
    }
    start() {
        this.logger('Proxy Inicializado');
        this.webSocketServer.start();
        // this.socketClient.start()
    }
}
// Application
const proxy = new Proxy();
proxy.start();
