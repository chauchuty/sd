import net from 'net'
import GeneralPreferences from './general.preferences'

class Observer extends GeneralPreferences{
    private name: string
    private sockets: net.Socket[] = []

    constructor(name: string){
        super()
        this.name = name
    }

    subscribe(socket: net.Socket){
        this.logger('Uma nova inscrição')
        this.sockets.push(socket)
    }

    unsubscribe(socket: net.Socket){
        this.sockets = this.sockets.filter(s => s !== socket)
    }

    notify(socket: net.Socket, message: any){
        this.sockets.forEach(s => {
            if(s !== socket){
                s.write(message)
            }
        })
    }
}

export default Observer