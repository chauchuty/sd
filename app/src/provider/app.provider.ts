import { createContext } from "react"
import Usuario from '../model/usuario.model'
import WebSocketClient from "../service/websocket.client"

type AppContextType = {
    usuario?: Usuario
    socket: WebSocketClient
    usuarios: Usuario[]
    chat: any[]
}

export const AppContext = createContext<AppContextType>({} as AppContextType)