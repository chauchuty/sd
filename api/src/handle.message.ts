import ProtocolRequest from "./model/protocol.request";
import ProtocolResponse from "./model/protocol.response";
import prisma from './prisma/connection'

class HandleMessage {
    private response!: ProtocolResponse
    private request!: ProtocolRequest

    handleProtocolRequest(data: Buffer){
        return new Promise<string>(async (resolve, reject) => {
            try {
                this.request = JSON.parse(data.toString()) as ProtocolRequest
                
                switch (this.request.operacao) {
                    case 'login':
                        this.response = await this.handleLogin(this.request.params)
                        break;
                    case 'register':
                        // this.response = await this.handleRegister(protocolRequest.params)
                        break;
                    case 'logout':
                        // this.response = await this.handleLogout(protocolRequest.params)
                        break;
                    default:
                        break;
                }
                resolve(this.response.toJson())
            } catch (error) {
                // reject(error)
            }
        })
    }

    async handleLogin(params: any): Promise<ProtocolResponse>{
        const { ra, senha } = params
        const usuario = await prisma.usuario.findFirst({
            where: {
                ra: ra,
                senha: senha
            }
        })

        if(usuario){
            return new ProtocolResponse(200, 'Usuário logado com sucesso!', usuario)
        } else {
            return new ProtocolResponse(404, 'Usuário ou senha inválido!', null)
        }
    }

    async handleRegister(params: any){
        // ...
    }

    async handleLogout(params: any){
        // ...
    }
}

export default HandleMessage