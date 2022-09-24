import ContentComponent from "../components/content/content.component";
import FooterComponent from "../components/footer/footer.component";
import NavBarComponent from "../components/navbar/navbar.component";
import SideBarComponent from "../components/sidebar/sidebar.component";
import ListComponent from "../components/list/list.component";

function HomePage(props: any) {
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
						<h2 className="text-center">Lista de usuários</h2>
						<ListComponent categoria="Mecânico" status="disponivel" />
						<ListComponent categoria="Eletricista" status="indisponivel" />
						<ListComponent categoria="Pedreiro" status="offline" />
					</ContentComponent>
				</div>
				<FooterComponent />
			</div>
		</div>
	);
}

export default HomePage;
