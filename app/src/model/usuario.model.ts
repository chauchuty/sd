import Categoria from "./categoria.model"

class Usuario {
    id: number
    nome: string
    ra: string
    senha: string
    categoria: Categoria
    descricao: string
    disponivel: boolean

    constructor(id: number, nome: string, ra: string, senha: string, categoria: Categoria, descricao: string, disponivel: boolean) {
        this.id = id
        this.nome = nome
        this.ra = ra
        this.senha = senha
        this.categoria = categoria
        this.descricao = descricao
        this.disponivel = disponivel
    }
}

export default Usuario