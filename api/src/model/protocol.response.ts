class ProtocolResponse {
    private status: number
    private mensagem: string
    private dados: any

    constructor(status: number, mensagem: string, dados: any){
        this.status = status
        this.mensagem = mensagem
        this.dados = dados
    }

    fromJson(json: any){
        return new ProtocolResponse(json['status'], json['mensagem'], json['dados'])
    }

    toJson(){
        return JSON.stringify(this)
    }

    getStatus(){
        return this.status
    }

}

export default ProtocolResponse

