import { useEffect, useRef } from "react";
import { render } from "react-dom";
import { useNavigate } from "react-router-dom";
import ProtocolRequest from "../../model/protocol.request";
import ProtocolResponse from "../../model/protocol.response";
import Usuario from "../../model/usuario.model";
import WebSocketClient from "../../service/websocket.client";

type NavBarProps = {
	access?: Usuario
}

function NavBarComponent(props: NavBarProps) {
	const navigate = useNavigate();
	const socket = useRef<WebSocketClient>();

	useEffect(() => {
		// Socket
		socket.current = new WebSocketClient();
		socket.current.onConnection(() => {
			console.log("Conectado com sucesso!");

			if (socket.current?.isConnected()) {
				socket.current.onMessage((response: ProtocolResponse) => {
					console.log(response)
					switch (response.status) {
						case 600:
							alert(response.mensagem)
							navigate("/login");
							break
						case 202:
							alert(response.mensagem)
							navigate("/login");
							break
						default:
							alert('Erro desconhecido!')
							break;
					}
				});

				socket.current.onError((error) => {
					console.error(error);
				});
			}
		})

		return () => {
			socket.current?.disconnect();
		}
		
	}, [])

	const handleLogout = () => {
		let request = new ProtocolRequest('logout', {});
		socket.current?.emit(request.toJson());
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
								props.access?.nome ? props.access.nome : "<Vazio>"
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
