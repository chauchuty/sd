class ProtocolRequest {
    public operacao: string
    public parametros: any

    constructor(operacao: string, parametros: any){
        this.operacao = operacao
        this.parametros = parametros
    }

    static fromJson(json: any){
        return new ProtocolRequest(json['operacao'], json['parametros'])
    }

    toJson(){
        return JSON.stringify(this)+"\n"
    }

}

export default ProtocolRequest