import env from '../config/environments';

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

    onMessage(callback: (message: Buffer) => void) {
        this.socket.onmessage = (message) => {
            callback(message.data)
        }
    }

    emit(message: string) {
        this.socket.send(message)
    }

    close() {
        this.socket.close()
    }
}

export default WebSocketClient