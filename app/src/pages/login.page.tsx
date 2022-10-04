import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ProtocolRequest from "../model/protocol.request";
import ProtocolResponse from "../model/protocol.response";
import WebSocketClient from "../service/websocket.client";

type Form = {
    ra: string
    senha: string
}

function LoginPage() {
    const navigate = useNavigate();
    const [socket, setSocket] = useState<WebSocketClient>(new WebSocketClient());

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Form>();

    useEffect(() => {
        socket.onConnection(() => {
            console.log("Conectado!");
        })

        socket.onMessage((data) => {
            let response = ProtocolResponse.fromJson(data);
            console.log(response)
            switch (response.status) {
                case 200:
                    alert("Usuário efetuado com sucesso!");
                    navigate("/home");
                    break;
                case 401:
                    alert("Usuário ou senha inválidos!");
                    navigate("/login");
                    break;
                case 403:
                    alert("Usuário já encontra-se conectado!");
                    navigate("/home");
                    break;
                case 404:
                    alert("Usuário ou senha inválidos!");
                    navigate("/login");
                    break;
                default:
                    alert("Erro desconhecido!");
            }
        })
    }, [])

    const onSubmit: SubmitHandler<Form> = (data) => {
        let request = new ProtocolRequest('login', data);
        socket?.emit(request.toJson());
    };


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Login</h1>
                                        </div>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="mb-3">
                                                <label htmlFor="ra" className="form-label">RA (Registro Acadêmico)</label>
                                                <input {...register("ra", { required: true })} type="text" className="form-control" id="ra" autoComplete="off" />
                                                {
                                                    errors.ra && <span className="form-text text-danger">Registro Acadêmico é obrigatório</span>
                                                }

                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="senha" className="form-label">Senha</label>
                                                <input {...register("senha", { required: true })} type="password" className="form-control" id="senha" autoComplete="off" />
                                                {
                                                    errors.ra && <span className="form-text text-danger">Senha é obrigatório</span>
                                                }
                                            </div>

                                            <button type="submit" className="btn btn-block btn-dark">Acessar</button>
                                        </form>
                                        <hr />
                                        <div className="text-center">
                                            <Link to="/register" className="small">Criar uma conta</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default LoginPage