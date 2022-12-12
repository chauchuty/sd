import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProtocolResponse from "../model/protocol.response";
import { AppContext } from "../provider/app.provider";
import WebSocketClient from "../service/websocket.client";

function Operation(props: any) {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Conexão Estabelecida");
    context.socket = new WebSocketClient();

    context.socket.onConnection(() => {
      if (context.socket?.isConnected()) {
        context.socket.onMessage((response: ProtocolResponse) => {
          switch (response.status) {
            case 200: // Logado com sucesso
              context.usuario = response.dados.usuario
              navigate("/home");
              break;
            case 201: // Cadastrado com sucesso
              navigate("/login");
              break;
            case 202: // Usuário já encontra-se cadastrado!
              break;
            case 203: // Lista de usuários
              context.usuarios = response.dados.usuarios;
              navigate("/home")
              break;
            case 207:
              console.log(response.dados.mensagem)
              context.chat.push({isMine: false, message: response.dados.mensagem})
              console.log(context.chat)
              break
            case 403:
              navigate("/login");
              break;
            case 404: // Usuário/Senha Inválido
              navigate("/login");
              break;
            case 500: // Erro interno do servidor
              navigate("/login");
              break;
            case 600: // Desconectado com sucesso
              navigate("/login");
              break;
          }

          if (response.mensagem && response.status !== 203 && response.status !== 207 && response.status !== 0) {
            alert(response.mensagem);
          }

          if (response.status != 200 && response.status != 203 && response.status !== 207 && response.status !== 0) {
            context.socket.disconnect();
          }
        });

        context.socket.onError((error) => {
          console.error(error);
        });

        context.socket.onClose(() => {
          console.log("Conexão Finalizada!");
        });
      }
    });
  }, []);

  return null;
}

export default Operation;