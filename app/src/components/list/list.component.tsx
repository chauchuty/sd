function ListComponent(props: any) {
	return (
		<table>
			<tbody>
				<tr>
					<div className="container">
						<div className="row">
							<div className="col-12">
								<div className="card mt-2">
									<div className="card-body">
										<div className="d-flex flex-row bd-highlight mb-1 justify-content-start align-items-baseline align-self-center ">
											<h5 className="card-title">{props.categoria}</h5>
											{props.status === "disponivel" ? (
												<span className="badge badge-success ml-2">Disponível</span>
											) : props.status === "indisponivel" ? (
												<span className="badge badge-danger ml-2">Indisponível</span>
											) : (
												<span className="badge badge-secondary ml-2 ">Offline</span>
											)}
										</div>
										<p className="card-text">
											Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio maxime
											quisquam similique a natus officiis ratione repudiandae quo, esse
											quod eveniet, autem est enim provident. Sunt ipsum praesentium nam
											rem!
										</p>
										{props.status === "disponivel" ? (
											<button type="button" className="btn btn-primary">
												Entrar em contato
											</button>
										) : (
											<button type="button" className="btn btn-primary" disabled>
												Entrar em contato
											</button>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</tr>
			</tbody>
		</table>
	);
}

export default ListComponent;
