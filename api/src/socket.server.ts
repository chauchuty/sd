import net from 'net'
import env from './config/environments'
import GeneralPreferences from './general.preferences'
import HandleMessage from './handle.message'

class SocketServer extends GeneralPreferences {
    private server!: net.Server
    private handleMessage: HandleMessage

    constructor() {
        super()
        this.handleMessage = new HandleMessage()
    }

    start() {
        this.logger('Iniciando Socket Server...')
        this.server = net.createServer(socket => {
            this.onConnection(socket)
            this.onMessage(socket)
            this.onError(socket)
            this.onClose(socket)
        })
        this.server.listen(env.api.port, env.api.host)
    }

    onConnection(socket: net.Socket) {
        this.logger(`Conectado: ${socket.remoteAddress}:${socket.remotePort}`)
    }

    onMessage(socket: net.Socket) {
        socket.on('data', (data: Buffer) => {
            this.logger(`Dados recebidos: ${data.toString()}`)
            try {
                this.logger('Tratando dados recebidos...')
                this.handleMessage.handleProtocolRequest(socket, data)
                    .then((response) => {
                        this.logger(`[Response] ${response}`)
                        socket.write(response)
                    })
                    .catch((error) => {
                        this.logger(`[Error] - ${error}`)
                        socket.write(error)
                    })

            } catch (error) {
                this.logger('Erro ao processar a mensagem recebida!')
            }
        })
    }

    onError(socket: net.Socket) {
        socket.on('error', (error) => {
            this.logger(`[ERROR]: ${error}`)
        })
    }

    onClose(socket: net.Socket) {
        socket.on('close', () => {
            this.logger(`Desconectado: ${socket.remoteAddress}:${socket.remotePort}`)
            socket.destroy()
        })
    }
}

export default SocketServer