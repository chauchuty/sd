import net from 'net'
import GeneralPreferences from "./general.preferences";
import ProtocolRequest from "./model/protocol.request";
import ProtocolResponse from "./model/protocol.response";
import Observer from './observer';
import prisma from "./prisma/connection";

class HandleMessage extends GeneralPreferences {
  private response!: ProtocolResponse;
  private request!: ProtocolRequest;
  private observers: Observer[] = [];

  constructor() {
    super();

    // Observers
    this.observers.push(new Observer("usuarios")); // [0] Observer Usuários
  }

  handleProtocolRequest(socket: net.Socket, data: Buffer) {
    this.logger(`[handleProtocolRequest] - ${data.toString()}`);
    return new Promise<string>(async (resolve, reject) => {
      try {
        this.request = JSON.parse(data.toString()) as ProtocolRequest;

        switch (this.request.operacao) {
          case "login":
            this.response = await this.handleLogin(socket, this.request.parametros);
            break;
          case "cadastrar":
            this.response = await this.handleRegister(this.request.parametros)
            break;
          case "logout":
            this.response = await this.handleLogout(socket, this.request.parametros);
            break;
          default:
            this.logger("Operação invalida!");
            this.response = new ProtocolResponse(400, "Operação invalida!", {});
            break;
        }
        resolve(this.response.toJson());
      } catch (error) {
        this.logger("Erro ao processar mensagem!");
        reject(
          new ProtocolResponse(400, "Erro ao processar mensagem", {
            error: error,
          }).toJson()
        );
      }
    });
  }

  async handleLogin(socket: net.Socket, params: any): Promise<any> {
    this.logger(`[handleLogin] - ${JSON.stringify(params)}`);
    const { ra, senha } = params;

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

    if (usuario) {
      usuario = await prisma.usuario.update({
        where: {
          id: usuario.id,
        },
        data: {
          disponivel: 1,
        },
      });

      if (usuario.disponivel === 1) {
        this.logger(`Usuário conectado com sucesso!`);
        this.observers[0].subscribe(socket, usuario)
        this.observers[0].notify()
        
        return new ProtocolResponse(200, "Usuário logado com sucesso!", { "usuario": usuario });
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
      return new ProtocolResponse(201, "Usuário cadastrado com sucesso!", { ...usuario });
    } else {
      this.logger(`Erro interno do servidor`);
      return new ProtocolResponse(500, "Erro interno do servidor", {});
    }
  }

  async handleLogout(socket: net.Socket, parametros: any) {
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

    if (usuario.disponivel !== 0) {
      this.logger(`Usuário desconectado com sucesso!`);
      this.observers[0].unsubscribe(socket, usuario);

      usuario = await prisma.usuario.update({
        where: {
          id: usuario.id,
        },
        data: {
          disponivel: 0,
        },
      });
      return new ProtocolResponse(600, "Usuário desconectado com sucesso!", {});
    } else {
      this.logger(`Usuário já encontra-se desconectado!`);
      return new ProtocolResponse(403, "Usuário já  encontra-se desconectado!", {});
    }
  }
}

export default HandleMessage;
