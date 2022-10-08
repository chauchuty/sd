import GeneralPreferences from "./general.preferences"
import ProxyWebSocket from "./proxy.websocket"

class Application extends GeneralPreferences {
    private proxyWebSocket!: ProxyWebSocket

    constructor(){
        super('Application')
        this.proxyWebSocket = new ProxyWebSocket()
    }

    start(){
        this.logger('Iniciado!')
        this.proxyWebSocket.start()
    }
}

// Application
const application = new Application()
application.start()
