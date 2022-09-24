import ProtocolRequest from "./model/protocol.request";
import ProtocolResponse from "./model/protocol.response";

class HandleMessage {

    handleProtocolRequest(data: Buffer){
        return new Promise<string>(async (resolve, reject) => {
            try {
                const protocolRequest = JSON.parse(data.toString()) as ProtocolRequest
                let response
                switch (protocolRequest.operacao) {
                    case 'login':
                        response = await this.handleLogin(protocolRequest.params)
                        break;
                    case 'register':
                        response = await this.handleRegister(protocolRequest.params)
                        break;
                    case 'logout':
                        response = await this.handleLogout(protocolRequest.params)
                        break;
                    default:
                        break;
                }
                resolve(new ProtocolResponse(200, 'OK', response).toJson())
            } catch (error) {
                // reject(error)
            }
        })
    }

    async handleLogin(params: any){
        // ...await 
    }

    async handleRegister(params: any){
        // ...
    }

    async handleLogout(params: any){
        // ...
    }
}

export default HandleMessage