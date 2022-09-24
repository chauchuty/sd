import { Server } from 'ws'
import env from './config/environments'
import GeneralPreferences from './general.preferences'

class WebSocketServer extends GeneralPreferences {
    private server!: Server

    constructor() {
        super()
    }

    start(){
        this.logger('Inicializando WebSocketServer')
        this.server = new Server({ port: env.api.websocketserver.port }, () => {
            this.logger(`Servidor iniciado em ${env.api.websocketserver.host}:${env.api.websocketserver.port}`)
        })
    }
}

export default WebSocketServer