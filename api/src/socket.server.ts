import net from 'net'
import env from './config/environments'
import GeneralPreferences from './general.preferences'
import HandleMessage from './handle.message'

class SocketServer extends GeneralPreferences {
    private server = net.createServer({
        allowHalfOpen: true
    })
    private handleMessage = new HandleMessage()

    constructor() {
        super()
        this.handleMessage = new HandleMessage()
    }

    start() {
        this.logger('Iniciando Socket Server...')

        this.server.listen(env.api.port, () => {
            this.logger(`Socket Server iniciado com sucesso: s://${env.api.host}:${env.api.port}`)
            this.onConnection()
        })
    }

    onConnection() {
        this.server.on('connection', (socket) => {
            this.logger('Cliente Conectado!')
            socket.on('ready', () => {
                this.onMessage(socket)
                this.onError(socket)
                this.onClose(socket)
                this.onTimeout(socket)
            })
        })
    }

    onMessage(socket: net.Socket) {
        socket.on('data', (data: Buffer) => {
            this.logger(`Dados recebidos: ${data.toString()}`)
            try {
                this.logger('Tratando dados recebidos...')
                this.handleMessage.handleProtocolRequest(data)
                    .then((response) => {
                        socket.write(response)
                    })
                    .catch((error) => {
                        socket.write(error);
                    })
            } catch (error) {
                this.logger('Erro ao processar a mensagem recebida!')
            }
        })
    }

    onError(socket: net.Socket) {
        socket.on('error', (error) => {
            this.logger(`Erro: ${error}`)
        })
    }

    onClose(socket: net.Socket) {
        socket.on('close', () => {
            this.logger('Cliente desconectado!')
        })
    }

    onTimeout(socket: net.Socket) {
        socket.on('timeout', () => {
            this.logger('Cliente desconectado por timeout!')
        })
    }
}

export default SocketServer