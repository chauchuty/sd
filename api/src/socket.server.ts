import net from 'net'
import env from './config/environments'
import GeneralPreferences from './general.preferences'
import HandleMessage from './handle.message'

class SocketServer extends GeneralPreferences {
    private server!: net.Server

    private handleMessage = new HandleMessage()

    constructor() {
        super()
        this.handleMessage = new HandleMessage()
    }

    start() {
        this.logger('Iniciando Socket Server...')
        this.server = net.createServer(socket => {
            this.logger(`Conectado: ${socket.remoteAddress}:${socket.remotePort}`)
            // socket.write(`Conectado: ${socket.remoteAddress}:${socket.remotePort}`)
            this.onMessage(socket)
            // this.onError(socket)
            this.onClose(socket)
        })
        this.server.listen(env.api.port, env.api.host)
    }

    onMessage(socket: net.Socket) {
        socket.on('data', data => {
            this.logger(`Mensagem recebida: ${data.toString()}`)
        })
        socket.on('data', (data: Buffer) => {
            this.logger(`Dados recebidos: ${data.toString()}`)
            try {
                this.logger('Tratando dados recebidos...')
                this.handleMessage.handleProtocolRequest(data)
                    .then((response) => {
                        this.logger(`[Response] ${response}`)
                        socket.write(response)
                    })
                    .catch((error) => {
                        this.logger(`[Error] - ${error}`)
                        socket.write(error)
                    })
                    .finally
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
            this.logger('Cliente desconectado!')
            socket.destroy()
        })
    }
}

export default SocketServer