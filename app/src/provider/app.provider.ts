import { createContext } from "react"
import Acesso from '../model/usuario.model'
import WebSocketClient from "../service/websocket.client"
import Usuario from './../model/usuario.model';

type AppContextType = {
    access?: Acesso
    socket: WebSocketClient
    usuarios: Usuario[]
}

export const AppContext = createContext<AppContextType>({} as AppContextType)