import { useEffect, useState, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ButtonComponent from "../components/shared/button.component";
import ProtocolRequest from "../model/protocol.request";
import { AppContext } from "../provider/app.provider";
import Operation from "../operations/operation";

type Form = {
    ra: string
    senha: string
}

function LoginPage() {
    const context = useContext(AppContext)
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<Form>();

    useEffect(() => {
        setValue("ra", "2099365");
        setValue("senha", "123321");
    }, [])

    const onSubmit: SubmitHandler<Form> = (data) => {
        const request = new ProtocolRequest('login', data);
        context.socket?.emit(request.toJson());
    };

    return (
        <>
            <Operation />
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

                                                <ButtonComponent label="Acessar" isLoading={isLoading} />
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
        </>
    )
}

export default LoginPage