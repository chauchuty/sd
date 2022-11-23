import { useContext, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ProtocolRequest from "../model/protocol.request";
import Operation from "../operations/operation";
import { AppContext } from "../provider/app.provider";
import WebSocketClient from "../service/websocket.client";

type Categoria = {
	id: number;
	nome: string;
};

type Form = {
	nome: string;
	ra: string;
	senha: string;
	categoria_id: number;
	descricao: string;
};

function RegisterPage() {
	const context = useContext(AppContext)
	const [categorias, setCategorias] = useState<Categoria[]>([]);
	const { register, handleSubmit, watch, setValue, setFocus, formState: { errors } } = useForm<Form>();

	const onSubmit: SubmitHandler<Form> = (data) => {
		const request = new ProtocolRequest('cadastrar', data);
		context.socket?.emit(request.toJson());
	};

	useEffect(() => {
		setValue('nome', 'Cesar Mauricio Chauchuty')
		setValue('ra', '2098270')
		setValue('senha', '010203')
		setValue('categoria_id', 0)
		setValue('descricao', 'Teste de cadastro')

		setCategorias([
			{ id: 0, nome: "Programador" },
			{ id: 1, nome: "Eletricista" },
			{ id: 2, nome: "Mecânico" },
			{ id: 3, nome: "Cientista" },
			{ id: 4, nome: "Professor" },
			{ id: 5, nome: "Analista" },
			{ id: 6, nome: "Gamer" },
			{ id: 7, nome: "Streamer" }
		]);

		return () => {
			context.socket?.disconnect();
		}
	}, [])

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
												<h1 className="h4 text-gray-900 mb-4">Cadastrar</h1>
											</div>
											<form onSubmit={handleSubmit(onSubmit)}>
												<div className="mb-3">
													<label htmlFor="ra" className="form-label">
														Nome
													</label>
													<input
														{...register("nome", { required: true })}
														type="text"
														className="form-control"
														autoComplete="off"
													/>
													{errors.ra && (
														<span className="form-text text-danger">Nome é obrigatório</span>
													)}
												</div>
												<div className="mb-3">
													<label htmlFor="ra" className="form-label">
														RA (Registro Acadêmico)
													</label>
													<input
														{...register("ra", { required: true })}
														type="text"
														className="form-control"
														autoComplete="off"
													/>
													{errors.ra && (
														<span className="form-text text-danger">
															Registro Acadêmico é obrigatório
														</span>
													)}
												</div>
												<div className="mb-3">
													<label htmlFor="senha" className="form-label">
														Senha
													</label>
													<input
														{...register("senha", { required: true })}
														type="password"
														className="form-control"
														autoComplete="off"
													/>
													{errors.ra && (
														<span className="form-text text-danger">Senha é obrigatório</span>
													)}
												</div>
												<div className="mb-3">
													<label htmlFor="descricao" className="form-label">
														Descrição
													</label>
													<select
														defaultValue={-1}
														className="form-control form-select"
														{...register("categoria_id", { required: true, valueAsNumber: true })}
													>
														<option value={-1} disabled>
															Selecione uma categoria
														</option>
														{categorias.map((categoria) => (
															<option key={categoria.id} value={categoria.id}>
																{categoria.nome}
															</option>
														))}
													</select>
													{errors.categoria_id && (
														<span className="form-text text-danger">
															Categoria é obrigatório
														</span>
													)}
												</div>

												{/* <div className="mb-3">
                                                <label htmlFor="categoria" className="form-label">Categoria</label>
                                                <input {...register("categoria", { required: true })} type="password" className="form-control" autoComplete="off" />
                                                {
                                                    errors.ra && <span className="form-text text-danger">Categoria é obrigatório</span>
                                                }
                                            </div> */}
												<div className="mb-3">
													<label htmlFor="descricao" className="form-label">
														Descrição da profissão
													</label>
													<textarea
														{...register("descricao", { required: true })}
														className="form-control"
														autoComplete="off"
														rows={4}
														style={{ resize: "none" }}
													/>
													{errors.ra && (
														<span className="form-text text-danger">
															Descrição é obrigatório
														</span>
													)}
												</div>

												<button type="submit" className="btn btn-block btn-dark">
													Cadastrar
												</button>
											</form>
											<hr />
											<div className="text-center">
												<Link to="/login" className="small">
													Já possui um acesso?
												</Link>
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
	);
}

export default RegisterPage;
