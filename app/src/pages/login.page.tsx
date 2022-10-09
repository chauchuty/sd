import { useEffect, useState, useRef, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ProtocolRequest from "../model/protocol.request";
import ProtocolResponse from "../model/protocol.response";
import { AppContext } from "../provider/app.provider";
import WebSocketClient from "../service/websocket.client";
import Authenticate from './../utils/authenticate'

type Form = {
    ra: string
    senha: string
}

function LoginPage() {
    const navigate = useNavigate();
    const context = useContext(AppContext)
    const socket = useRef<WebSocketClient>();

    const { register, handleSubmit, watch, formState: { errors }, reset, setValue, getValues} = useForm<Form>();

    useEffect(() => {
        // Default Value Form
        setValue("ra", "1234567");
        setValue("senha", "123456");
        console.log(getValues());
        
        // Socket
        socket.current = new WebSocketClient();
        socket.current.onConnection(() => {
            console.log("Conectado com sucesso!");

            if (socket.current?.isConnected()) {
                socket.current.onMessage((response: ProtocolResponse) => {
                    console.log(response)
                    switch (response.status) {
                        case 200:
                            alert(response.mensagem)
                            context.access = response.dados; // Define Context!
                            navigate("/home");
                            break;
                        case 404:
                            alert(response.mensagem)
                            reset({ ra: "", senha: ""});
                        case 500:
                            alert(response.mensagem)
                            break;
                        default:
                            break;
                    }
                });

                socket.current.onError((error) => {
                    console.error(error);
                });
            }
        })
        
        return () => {
            socket.current?.disconnect();
        }
    }, []);

    const onSubmit: SubmitHandler<Form> = (data) => {
        let request = new ProtocolRequest('login', data);
        console.log(request)
        socket.current?.emit(request.toJson());
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