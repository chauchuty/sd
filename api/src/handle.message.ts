import GeneralPreferences from "./general.preferences";
import ProtocolRequest from "./model/protocol.request";
import ProtocolResponse from "./model/protocol.response";
import prisma from "./prisma/connection";

class HandleMessage extends GeneralPreferences {
  private response!: ProtocolResponse;
  private request!: ProtocolRequest;

  handleProtocolRequest(data: Buffer) {
    this.logger(`[handleProtocolRequest] - ${data.toString()}`);
    return new Promise<string>(async (resolve, reject) => {
      try {
        this.request = JSON.parse(data.toString()) as ProtocolRequest;

        switch (this.request.operacao) {
          case "login":
            this.response = await this.handleLogin(this.request.parametros);
            break;
          case "cadastrar":
            this.response = await this.handleRegister(this.request.parametros)
            break;
          case "logout":
            this.response = await this.handleLogout(this.request.parametros);
            break;
          default:
            this.logger("Operação invalida!");
            this.response = new ProtocolResponse(400, "Operação invalida!", {});
            break;
        }
        resolve(this.response.toJson());
      } catch (error) {
        this.logger("Protocolo Inválido!");
        reject(
          new ProtocolResponse(400, "Protolo Inválido", {
            error: error,
          }).toJson()
        );
      }
    });
  }

  async handleLogin(parametros: any): Promise<any> {
    this.logger(`[handleLogin] - ${JSON.stringify(parametros)}`);
    const { ra, senha } = parametros;

    let usuario = await prisma.usuario.findFirst({
      where: {
        ra: ra,
        senha: senha,
      },
    });

    if (!usuario) {
      this.logger(`Usuário não encontrado / Usuário ou senha inválido!`);
      return new ProtocolResponse(404, "Usuário não encontrado / Usuário ou senha inválido!", {});
    }

    if (usuario.status !== 0) {
      this.logger(`Usuário já encontra-se conectado!`);
      return new ProtocolResponse(403, "Usuário já encontra-se conectado!", {});
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
        return new ProtocolResponse(200, "Usuário logado com sucesso!", {});
      } else {
        return new ProtocolResponse(500, "Erro interno do servidor", {});
      }
    }
  }

  async handleRegister(parametros: any) {
    this.logger(`[handleRegister] - ${JSON.stringify(parametros)}`);
    const { ra } = parametros;

    let usuario = await prisma.usuario.findFirst({
      where: {
        ra: ra,
      },
    });

    if (usuario) {
      this.logger(`Usuário já encontra-se cadastrado! ${usuario.ra}`);
      return new ProtocolResponse(202, "Usuário já encontra-se cadastrado!", {});
    }

    usuario = await prisma.usuario.create({
      data: parametros,
    });

    this.logger(`[DB] - ${usuario}`);

    if (usuario) {
      this.logger(`Usuário cadastrado com sucesso!`);
      return new ProtocolResponse(201, "Usuário cadastrado com sucesso!", {});
    } else {
      this.logger(`Erro interno do servidor`);
      return new ProtocolResponse(500, "Erro interno do servidor", {});
    }
  }

  async handleLogout(parametros: any) {
    this.logger(`[handleLogout] - ${JSON.stringify(parametros)}`);
    const { ra, senha } = parametros;

    let usuario = await prisma.usuario.findFirst({
      where: {
        ra: ra,
        senha: senha,
      },
    });

    if (!usuario) {
      this.logger(`Usuário não encontrado!`);
      return new ProtocolResponse(404, "Usuário não encontrado!", {});
    }

    if (usuario.status !== 0) {
      this.logger(`Usuário desconectado com sucesso!`);
      usuario = await prisma.usuario.update({
        where: {
          id: usuario.id,
        },
        data: {
          status: 0,
        },
      });
      return new ProtocolResponse(600, "Usuário desconectado com sucesso!", {});
    } else {
      this.logger(`Usuário já  encontra-se desconectado!`);
      return new ProtocolResponse(202, "Usuário já  encontra-se desconectado!", {});
    }
  }
}

export default HandleMessage;
