import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProtocolRequest from "../../model/protocol.request";
import ProtocolResponse from "../../model/protocol.response";
import Usuario from "../../model/usuario.model";
import { AppContext } from "../../provider/app.provider";

function NavBarComponent() {
	const navigate = useNavigate();
	const context = useContext(AppContext)

	useEffect(() => {

	}, [])

	const handleLogout = () => {
		let request = new ProtocolRequest('logout', {ra: context.usuario?.ra, senha: context.usuario?.senha})
		context.socket?.emit(request.toJson());
	};

	return (
		<div className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
			<ul className="navbar-nav ml-auto">
				<li className="nav-item dropdown no-arrow">
					<a
						className="nav-link dropdown-toggle"
						href="#"
						id="userDropdown"
						role="button"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						<span className="mr-2 d-none d-lg-inline text-gray-600 small">
							{
								context.usuario?.ra ? context.usuario.ra : "<Vazio>"
							}
						</span>
						<img
							className="img-profile rounded-circle"
							src="img/undraw_profile.svg"
						/>
					</a>

					<div
						className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
						aria-labelledby="userDropdown"
					>
						<a
							className="dropdown-item"
							href="#"
							data-toggle="modal"
							data-target="#logoutModal"
							onClick={handleLogout}
						>
							<i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
							Logout
						</a>
					</div>
				</li>
			</ul>
		</div>
	);
}

export default NavBarComponent;
