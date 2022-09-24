import WebSocketServer from "./websocket.client"
import SocketClient from "./socket.client"
import GeneralPreferences from "./general.preferences"

class Proxy extends GeneralPreferences {
    private webSocketServer!: WebSocketServer
    private socketClient: SocketClient

    constructor(){
        super()
        this.webSocketServer = new WebSocketServer()
        this.socketClient = new SocketClient()
    }

    start(){
        this.logger('Proxy Inicializado')
        // this.webSocketServer.start()
        this.socketClient.start()
    }
}

// Application
const proxy = new Proxy()
proxy.start()
