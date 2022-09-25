"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_server_1 = __importDefault(require("./socket.server"));
class Application {
    constructor() {
        this.socketServer = new socket_server_1.default();
    }
    start() {
        this.socketServer.start();
    }
}
// Application
const app = new Application();
app.start();
