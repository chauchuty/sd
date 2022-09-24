import net from 'net'
import env from './config/environments'
import GeneralPreferences from './general.preferences'
import HandleMessage from './handle.message'
import ProtocolRequest from './model/protocol.request'
import ProtocolResponse from './model/protocol.response'


class SocketServer extends GeneralPreferences{
    private server = net.createServer()
    private handleMessage = new HandleMessage()
    
    constructor(){
        super()
        this.handleMessage = new HandleMessage()
    }

    start(){
        this.logger('Iniciando Socket Server...')

        this.server.listen(env.api.port, () => {
            this.logger(`Socket Server iniciado com sucesso: s://${env.api.host}:${env.api.port}`)

            this.onConnection()
        })
    }
    
    onConnection(){
        this.server.on('connection', (socket) => {
            this.logger('Cliente Conectado!')

            this.onMessage(socket)
            this.onClose(socket)
        })
    }

    

    onMessage(socket: net.Socket){
        socket.on('data', (data) => {
            this.logger(`Dados recebidos: ${data.toString()}`)
            try {
                this.logger('Tratando dados recebidos...')
                this.handleMessage.handleProtocolRequest(data)
                    .then((response) => {
                        socket.emit('data', response)
                    })
                    .catch((error) => {
                        socket.emit('data', new ProtocolResponse(500, error, {}).toJson())
                    })
            } catch (error) {
                this.logger('Erro ao processar a mensagem recebida!')
            }
            
        })
    }

    onClose(socket: net.Socket){
        socket.on('close', () => {
            this.logger('Cliente desconectado!')
        })
    }
}

export default SocketServer