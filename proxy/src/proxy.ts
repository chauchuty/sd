import WebSocketServer from "./websocket.server"
import GeneralPreferences from "./general.preferences"

class Proxy extends GeneralPreferences {
    private webSocketServer!: WebSocketServer

    constructor(){
        super('Proxy')
        this.webSocketServer = new WebSocketServer()
    }

    start(){
        this.logger('Inicializado')
        this.webSocketServer.start()
    }
}

// Application
const proxy = new Proxy()
proxy.start()
