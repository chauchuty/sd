import { usuario } from '@prisma/client'
import net from 'net'
import GeneralPreferences from './general.preferences'
import ProtocolResponse from './model/protocol.response'

class Observer extends GeneralPreferences {
    private name: string
    private sockets: Map<net.Socket, usuario> = new Map()

    constructor(name: string) {
        super()
        this.name = name
    }

    subscribe(socket: net.Socket, usuario: usuario) {
        this.sockets.set(socket, usuario)
    }

    unsubscribe(socket: net.Socket, usuario: usuario) {
        this.sockets.delete(socket)
    }

    notify() {
        setTimeout(() => {
            this.sockets.forEach((usuario, socket) => {
                socket.write(new ProtocolResponse(203, "Lista de Usuários", { usuario: "usuario" }).toJson())
            })
        }, 1000)
       
    }
}

export default Observer