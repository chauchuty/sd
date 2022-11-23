import { createContext } from "react"
import Acesso from '../model/usuario.model'
import WebSocketClient from "../service/websocket.client"

type AppContextType = {
    access?: Acesso
    socket: WebSocketClient
}

export const AppContext = createContext<AppContextType>({} as AppContextType)