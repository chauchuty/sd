import GeneralPreferences from "./general.preferences";
import ProtocolRequest from "./model/protocol.request";
import ProtocolResponse from "./model/protocol.response";
import prisma from "./prisma/connection";

class HandleMessage extends GeneralPreferences {
  private response!: ProtocolResponse;
  private request!: ProtocolRequest;

  handleProtocolRequest(data: Buffer) {
    return new Promise<string>(async (resolve, reject) => {
      try {
        this.request = JSON.parse(data.toString()) as ProtocolRequest;

        switch (this.request.operacao) {
          case "login":
            this.response = await this.handleLogin(this.request.params);
            break;
          case "register":
            // this.response = await this.handleRegister(protocolRequest.params)
            break;
          case "logout":
            this.response = await this.handleLogout(this.request.params)
            break;
          default:
            this.logger("Operação invalida!");
            this.response = new ProtocolResponse(400, "Operação invalida!", {});
            break;
        }
        resolve(this.response.toJson());
      } catch (error) {
        this.logger("Internal Server Error");
        reject(
          new ProtocolResponse(500, "Internal Server Error", {
            error: error,
          }).toJson()
        );
      }
    });
  }

  async handleLogin(params: any): Promise<any> {
    this.logger(`[handleLogin] - ${JSON.stringify(params)}`);
    const { ra, senha } = params;

    let usuario = await prisma.usuario.findFirst({
      where: {
        ra: ra,
        senha: senha,
      },
    });

    if (!usuario) {
      this.logger(`Usuário não encontrado!`);
      return new ProtocolResponse(401, "Usuário não encontrado!", {});
    }

    if (usuario.status !== 0) {
      this.logger(`Usuário já conectado!`);
      return new ProtocolResponse(401, "Usuário já conectado!", {
        nome: usuario.nome,
        status: usuario.status,
      });
    }

    if (usuario) {
      usuario = await prisma.usuario.update({
        where: {
          id: usuario.id,
        },
        data: {
          status: 1,
        },
      });

      if (usuario.status === 1) {
        return new ProtocolResponse(
          200,
          "Usuário logado com sucesso!",
          usuario
        );
      } else {
        return new ProtocolResponse(500, "Internal Server Error", {
          usuario,
        });
      }
    }
  }

  async handleRegister(params: any) {}

  async handleLogout(params: any) {
    this.logger(`[handleLogout] - ${JSON.stringify(params)}`);
    const { ra, senha } = params;

    let usuario = await prisma.usuario.findFirst({
      where: {
        ra: ra,
        senha: senha
      },
    });

    if (!usuario) {
      this.logger(`Usuário não encontrado!`);
      return new ProtocolResponse(401, "Usuário não encontrado!", {});
    }

    if (usuario.status !== 0) {
      this.logger(`Usuário desconectado!`);
      usuario = await prisma.usuario.update({
        where: {
          id: usuario.id,
        },
        data: {
          status: 0,
        },
      });
      return new ProtocolResponse(200, "Usuário desconectado com sucesso!", {});
    } else {
      this.logger(`Usuário já desconectado!`);
      return new ProtocolResponse(401, "Usuário já está desconectado!", {});
    }
  }
}

export default HandleMessage;
