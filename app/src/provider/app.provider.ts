import { createContext } from "react"
import Acesso from '../model/acesso.model'

type AppContextType = {
    access?: Acesso
}

export const AppContext = createContext<AppContextType>({} as AppContextType)