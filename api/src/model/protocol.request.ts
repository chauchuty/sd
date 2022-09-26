class ProtocolRequest {
    public operacao: string
    public params: any

    constructor(operation: string, params: any){
        this.operacao = operation
        this.params = params
    }

    fromJson(json: any){
        return new ProtocolRequest(json['operacao'], json['params'])
    }

    toJson(){
        return JSON.stringify(this)+"\n"
    }

}

export default ProtocolRequest