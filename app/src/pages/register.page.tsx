import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type Categoria = {
	id: number;
	nome: string;
};

type Form = {
	nome: string;
	ra: string;
	senha: string;
	categoria: Categoria;
	descricao: string;
};

function RegisterPage() {
	const [categorias, setCategorias] = useState<Categoria[]>([]);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Form>();

	const onSubmit: SubmitHandler<Form> = (data) => {
		console.log(data); // Implementar Login
	};

	useEffect(() => {
		// Implementar requisição para buscar categorias
		setCategorias([
			{ id: 1, nome: "Eletromecânico" },
			{ id: 2, nome: "Desenvolvedor" },
			{ id: 3, nome: "Professor" },
		]);
	}, []);

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
													{...register("categoria", { required: true })}
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
												{errors.categoria && (
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
											<Link to="/register" className="small">
												Criar uma conta
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
