class ProtocolResponse {
    public status: number
    public mensagem: string
    public dados: any

    constructor(status: number, mensagem: string, dados: any){
        this.status = status
        this.mensagem = mensagem
        this.dados = dados
    }

    static fromJson(data: Buffer){
        let json = JSON.parse(data.toString())
        return new ProtocolResponse(json.status, json.mensagem, json.dados)
    }

    toJson(){
        return JSON.stringify(this)
    }

}

export default ProtocolResponse