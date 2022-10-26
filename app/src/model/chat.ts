import Usuario from "./acesso.model";

class Chat {
    usuarios: Usuario[]

    constructor(usuarios: Usuario[]) {
        this.usuarios = usuarios
    }
}

export default Chat