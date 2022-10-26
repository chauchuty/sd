import Categoria from "./categoria.model"

class Acesso {
    ra: string
    senha: string

    constructor(ra: string, senha: string) {
        this.ra = ra
        this.senha = senha
    }
}

export default Acesso