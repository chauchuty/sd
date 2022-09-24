import net from 'net'
import env from './config/environments'
import GeneralPreferences from './general.preferences'

class SocketClient extends GeneralPreferences {
    private client: net.Socket

    constructor() {
        super()
        this.client = new net.Socket()
    }

    start(){
        this.logger('Inicializando SocketClient')
        this.client.connect(env.api.socketclient.port, env.api.socketclient.host, () => {
            this.logger('Conectado ao servidor')
            this.emit("Brasil")
        })
    }

    emit(message: string){
        this.client.write(message)
    }
}

export default SocketClient