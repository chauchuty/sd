import Usuario from "./usuario.model";

class Chat {
    usuarios: Usuario[]

    constructor(usuarios: Usuario[]) {
        this.usuarios = usuarios
    }
}

export default Chat