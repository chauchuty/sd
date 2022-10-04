import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ProtocolRequest from "../model/protocol.request";
import ProtocolResponse from "../model/protocol.response";
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
	const [socket, setSocket] = useState<WebSocketClient>(new WebSocketClient());
	const navigate = useNavigate();
	const [categorias, setCategorias] = useState<Categoria[]>([]);
	const { register, handleSubmit, watch, formState: { errors } } = useForm<Form>();

	const onSubmit: SubmitHandler<Form> = (data) => {
		let request = new ProtocolRequest('cadastrar', data);
		socket.emit(request.toJson())
	};

	useEffect(() => {
		socket.onConnection(() => {
			console.log("Conectado!");
		});

		socket.onMessage((data) => {
			let response = ProtocolResponse.fromJson(data);
			console.log(response)
			switch (response.status) {
				case 200:
					alert("Usuário efetuado com sucesso!");
					navigate("/home");
					break;
				case 202:
					alert("Usuário já encontra-se cadastrado!");
					navigate("/register");
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
		});
		setCategorias([
			{ id: 1, nome: "Eletromecânico" },
			{ id: 2, nome: "Desenvolvedor" },
			{ id: 3, nome: "Professor" },
		]);

	}, []);

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
												Acessar
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
	);
}

export default RegisterPage;
