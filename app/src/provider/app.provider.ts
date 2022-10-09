import { createContext } from "react"
import Usuario from './../model/usuario.model'

type AppContextType = {
    access?: Usuario
}

export const AppContext = createContext<AppContextType>({} as AppContextType)