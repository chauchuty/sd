import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentComponent from "../components/content/content.component";
import FooterComponent from "../components/footer/footer.component";
import NavBarComponent from "../components/navbar/navbar.component";
import SideBarComponent from "../components/sidebar/sidebar.component";
import Usuario from "../model/usuario.model";
import Operation from "../operations/operation";
import { AppContext } from "../provider/app.provider";

function HomePage(props: any) {
	var categorias: any = [
		{ id: 0, nome: "Programador" },
		{ id: 1, nome: "Eletricista" },
		{ id: 2, nome: "Mecânico" },
		{ id: 3, nome: "Cientista" },
		{ id: 4, nome: "Professor" },
		{ id: 5, nome: "Analista" },
		{ id: 6, nome: "Gamer" },
		{ id: 7, nome: "Streamer" },
	]
	const context = useContext(AppContext)
	const navigate = useNavigate()

	useEffect(() => {
		
		context.usuarios = []
		if (!context.socket?.isConnected()) {
			navigate('/login')
		}

		window.addEventListener('beforeunload', () => {
			context.socket?.disconnect()
		})
	}, [])

	return (
		<>
			<div id="wrapper">
				<SideBarComponent />
				<div
					id="content-wrapper"
					className="d-flex flex-column"
					style={{ height: "100vh" }}
				>
					<div id="content">
						<NavBarComponent />
						<ContentComponent>
							<h2 className="text-center">Profissionais</h2>

							<table className="table">
								<thead>
									<tr className="text-center">
										<th scope="col">#</th>
										<th scope="col">Nome</th>
										<th scope="col">Profissão</th>
										<th scope="col">Descrição</th>
										<th scope="col">Disponivel</th>
										<th scope="col">Chat</th>
									</tr>
								</thead>
								<tbody>
									{
										context.usuarios && context.usuarios.length > 0 ? (
											context.usuarios.map((usuario, index) => {
												return (
													<tr key={index} className="text-center">
														<th scope="row">{index}</th>
														<td>{usuario.nome}</td>
														<td>{categorias.filter((c: any) => c.id == usuario.categoria_id)[0].nome}</td>
														<td>{usuario.descricao}</td>
														<td>{usuario.disponivel && (
															<div className="d-grid gap-1">
																<button className="btn btn-sm btn-dark" type="button">Chat</button>
															</div>
														)} 
														</td>
														<td>{usuario.disponivel && (
															<div className="d-grid gap-1">
																<button className="btn btn-sm btn-success" disabled type="button">Online</button>
															</div>
														)} 
														</td>
													</tr>
												)
											})
										) : (
											<tr>
												<td colSpan={6} className="text-center">Nenhum profissional disponível</td>
											</tr>
										)


									}
								</tbody>
							</table>
						</ContentComponent>
					</div>
					<FooterComponent />
				</div>
			</div>
		</>
	);
}

export default HomePage;
