import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContentComponent from "../components/content/content.component";
import FooterComponent from "../components/footer/footer.component";
import NavBarComponent from "../components/navbar/navbar.component";
import SideBarComponent from "../components/sidebar/sidebar.component";
import { AppContext } from "../provider/app.provider";

function HomePage(props: any) {
	const context = useContext(AppContext)
	const navigate = useNavigate()

	useEffect(() => {
		if(!context.socket?.isConnected()){
			navigate('/login')
		}
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
					</ContentComponent>
				</div>
				<FooterComponent />
			</div>
		</div>
	);
}

export default HomePage;
