import net from 'net'
import env from './config/environments'

class SocketClient {
    private client: net.Socket

    constructor() {
        this.client = new net.Socket()
        
    }

    start(){
        this.client.connect(env.api.port, env.api.host, () => {
            console.log('Conectado ao servidor!')
            this.emit("Brasil")
        })
    }

    emit(message: string){
        this.client.write(message)
    }
}

// Application
const socketClient = new SocketClient()
socketClient.start()