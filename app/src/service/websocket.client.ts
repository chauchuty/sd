import env from '../config/environments';
import ProtocolResponse from '../model/protocol.response';

class WebSocketClient {
    public socket: WebSocket

    constructor() {
        this.socket = new WebSocket(`ws://${env.development.api.proxy.host}:${env.development.api.proxy.port}`)
    }
    

    onConnection(callback: () => void) {
        this.socket.onopen = () => {
            callback()
        }
    }

    onMessage(callback: (message: ProtocolResponse) => void) {
        this.socket.onmessage = (message) => {
            callback(ProtocolResponse.fromJson(message.data))
        }
    }

    onError(callback: (error: Event) => void) {
        this.socket.onerror = (error) => {
            callback(error)
        }
    }

    onClose(callback: () => void) {
        this.socket.onclose = () => {
            callback()
        }
    }

    emit(message: string) {
        this.socket.send(message)
    }

    disconnect() {
        this.socket.close()
    }
}

export default WebSocketClient