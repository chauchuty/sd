import ContentComponent from "../components/content/content.component";
import FooterComponent from "../components/footer/footer.component";
import NavBarComponent from "../components/navbar/navbar.component";
import SideBarComponent from "../components/sidebar/sidebar.component";
import ListComponent from "../components/list/list.component";
import { useEffect, useState } from "react";
import Usuario from "../model/usuario.model";
import Categoria from "../model/categoria.model";

function HomePage(props: any) {
	const [usuarios, setUsuarios] = useState<Usuario[]>([]);

	useEffect(() => {
		setUsuarios([
			new Usuario({
				id: 1,
				nome: "João",
				categoria: new Categoria({
					id: 1,
					nome: "Tecnologia",
				}),
				descricao: "Um bom profissional",
				ra: "2098270",
				senha: "123456",
				status: 1,
			}),
			new Usuario({
				id: 2,
				nome: "Maria",
				categoria: new Categoria({
					id: 2,
					nome: "Saúde",
				}),
				descricao: "Uma boa profissional",
				ra: "2098270",
				senha: "123456",
				status: 0
			}),
			new Usuario({
				id: 3,
				nome: "WIll Brasil",
				categoria: new Categoria({
					id: 2,
					nome: "Desenvolvedor",
				}),
				descricao: "Uma boa profissional",
				ra: "2098270",
				senha: "123456",
				status: 0
			}),
		])
	}, [])

	return (
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
						<ListComponent
							data={usuarios}
							fields={[
								{ name: "nome", label: "Nome" },
							]}
						/>
					</ContentComponent>
				</div>
				<FooterComponent />
			</div>
		</div>
	);
}

export default HomePage;
