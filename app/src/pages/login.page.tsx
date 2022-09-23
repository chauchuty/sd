import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type Form = {
    ra: string
    senha: string
}

function LoginPage() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Form>();

    const onSubmit: SubmitHandler<Form> = data => {
        console.log(data); // Implementar Login
    };

    // useEffect(() => {
    //     console.log(watch("ra"));
    //     console.log(watch("senha"));
    // }, [watch("ra"), watch("senha")]);

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
                                                <input {...register("ra")} type="text" className="form-control" id="ra" />
                                                {
                                                    errors.ra && <span className="form-text text-danger">Este campo é obrigatório</span>
                                                }

                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="senha" className="form-label">Senha</label>
                                                <input {...register("senha")} type="password" className="form-control" id="senha" />
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