"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const general_preferences_1 = __importDefault(require("./general.preferences"));
const protocol_response_1 = __importDefault(require("./model/protocol.response"));
const connection_1 = __importDefault(require("./prisma/connection"));
class HandleMessage extends general_preferences_1.default {
    handleProtocolRequest(data) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.request = JSON.parse(data.toString());
                switch (this.request.operacao) {
                    case "login":
                        this.response = yield this.handleLogin(this.request.params);
                        break;
                    case "cadastrar":
                        this.response = yield this.handleRegister(this.request.params);
                        break;
                    case "logout":
                        this.response = yield this.handleLogout(this.request.params);
                        break;
                    default:
                        this.logger("Operação invalida!");
                        this.response = new protocol_response_1.default(400, "Operação invalida!", {});
                        break;
                }
                resolve(this.response.toJson());
            }
            catch (error) {
                this.logger("Internal Server Error");
                reject(new protocol_response_1.default(500, "Internal Server Error", {
                    error: error,
                }).toJson());
            }
        }));
    }
    handleLogin(params) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger(`[handleLogin] - ${JSON.stringify(params)}`);
            const { ra, senha } = params;
            let usuario = yield connection_1.default.usuario.findFirst({
                where: {
                    ra: ra,
                    senha: senha,
                },
            });
            if (!usuario) {
                this.logger(`Usuário não encontrado!`);
                return new protocol_response_1.default(401, "Usuário não encontrado!", {});
            }
            if (usuario.status !== 0) {
                this.logger(`Usuário já conectado!`);
                return new protocol_response_1.default(401, "Usuário já conectado!", {
                    nome: usuario.nome,
                    status: usuario.status,
                });
            }
            if (usuario) {
                usuario = yield connection_1.default.usuario.update({
                    where: {
                        id: usuario.id,
                    },
                    data: {
                        status: 1,
                    },
                });
                if (usuario.status === 1) {
                    return new protocol_response_1.default(200, "Usuário logado com sucesso!", usuario);
                }
                else {
                    return new protocol_response_1.default(500, "Internal Server Error", {
                        usuario,
                    });
                }
            }
        });
    }
    handleRegister(params) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger(`[handleRegister] - ${JSON.stringify(params)}`);
            const { ra } = params;
            let usuario = yield connection_1.default.usuario.findFirst({
                where: {
                    ra: ra,
                },
            });
            if (usuario) {
                this.logger(`Usuário já cadastrado! ${usuario.ra}`);
                return new protocol_response_1.default(401, "Usuário já cadastrado!", { ra: usuario.ra });
            }
            usuario = yield connection_1.default.usuario.create({
                data: params,
            });
            this.logger(`[DB] - ${usuario}`);
            if (usuario) {
                this.logger(`Usuário cadastrado com sucesso!`);
                return new protocol_response_1.default(200, "Usuário cadastrado com sucesso!", {
                    usuario,
                });
            }
            else {
                this.logger(`Não foi possível cadastrar usuário!`);
                return new protocol_response_1.default(500, "Internal Server Error!", {});
            }
        });
    }
    handleLogout(params) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger(`[handleLogout] - ${JSON.stringify(params)}`);
            const { ra, senha } = params;
            let usuario = yield connection_1.default.usuario.findFirst({
                where: {
                    ra: ra,
                    senha: senha,
                },
            });
            if (!usuario) {
                this.logger(`Usuário não encontrado!`);
                return new protocol_response_1.default(401, "Usuário não encontrado!", {});
            }
            if (usuario.status !== 0) {
                this.logger(`Usuário desconectado!`);
                usuario = yield connection_1.default.usuario.update({
                    where: {
                        id: usuario.id,
                    },
                    data: {
                        status: 0,
                    },
                });
                return new protocol_response_1.default(200, "Usuário desconectado com sucesso!", {});
            }
            else {
                this.logger(`Usuário já desconectado!`);
                return new protocol_response_1.default(401, "Usuário já está desconectado!", {});
            }
        });
    }
}
exports.default = HandleMessage;
