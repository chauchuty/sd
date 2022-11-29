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
	const context = useContext(AppContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (!context.socket?.isConnected()) {
			navigate('/login')
		}
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
									<tr>
										<th scope="col">#</th>
										<th scope="col">Nome</th>
										<th scope="col">RA</th>
										<th scope="col">Descrição</th>
										<th scope="col">Disponivel</th>

									</tr>
								</thead>
								<tbody>
									{
										context.usuarios && (
											context.usuarios.map((usuario, index) => {
												return (
													<tr key={index}>
														<th scope="row">{index}</th>
														<td>{usuario.nome}</td>
														<td>{usuario.ra}</td>
														<td>{usuario.descricao}</td>
														<td>{usuario.disponivel ? 'Sim' : 'Não'}</td>
													</tr>
												)
											})
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
