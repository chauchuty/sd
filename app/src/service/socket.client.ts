import env from '../config/environments';

class SocketClient {
    public socket: WebSocket

    constructor() {
        this.socket = new WebSocket(`ws://${env.development.api.proxy.host}:${env.development.api.proxy.port}`)
        this.socket.onopen = () => {
            this.socket.onmessage = (message) => {
                console.log(message)
            }
        }
    }

    emit(message: string) {
        this.socket.send(message)
    }
}

export default SocketClient