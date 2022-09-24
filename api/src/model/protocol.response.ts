class ProtocolResponse {
    private status: number
    private message: string
    private response: any

    constructor(status: number, message: string, response: any){
        this.status = status
        this.message = message
        this.response = response
    }

    fromJson(json: any){
        return new ProtocolResponse(json['status'], json['message'], json['response'])
    }

    toJson(){
        return JSON.stringify(this)
    }

}

export default ProtocolResponse