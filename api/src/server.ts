import net from 'net'
import env from './config/environments'

class GeneralPreferences {

    protected logger(message: string){
        console.log(`[${new Date().toLocaleTimeString()}] - ${message}`)
    }
}

class SocketServer extends GeneralPreferences{
    private server = net.createServer()
    
    constructor(){
        super()
    }

    start(){
        this.logger('Iniciando Socket Server...')

        this.server.listen(env.api.port, () => {
            this.logger(`Socket Server iniciado com sucesso: s://${env.api.host}:${env.api.port}`)

            this.server.on('connection', (socket) => {
                this.logger('Cliente Conectado!')

                socket.on('data', (data) => {
                    this.logger(`Dados recebidos: ${data.toString()}`)
                })
            })
        })
    }
    
    emit(){}

    onError(){}

    disconnect(){}
}

class Application extends GeneralPreferences {
    private socketServer = new SocketServer()

    constructor(){
        super()
    }

    start(){
        this.logger('Iniciando Aplicação!')
        this.socketServer.start()
    }
}

// Main
const app = new Application();
app.start()