import * as React from "react";
import { render } from "react-dom";

function NavBarComponent(props: any) {
	const [userName, setUserName] = React.useState("Test User");

	const handeclick = () => {
		console.log("clicked");
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
							{userName}
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
							onClick={handeclick}
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
