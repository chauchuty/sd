import Categoria from "./categoria.model"

class Usuario {
    id: number
    nome: string
    ra: string
    senha: string
    descricao: string
    categoria: Categoria
    status: number

    constructor({ id, nome, ra, senha, descricao, categoria, status }: Usuario) {
        this.id = id
        this.nome = nome
        this.ra = ra
        this.senha = senha
        this.descricao = descricao
        this.categoria = categoria
        this.status = status
    }
}

export default Usuario