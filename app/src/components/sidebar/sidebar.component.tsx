import SideBarItemComponent from "./sidebar.item.component";

function SideBarComponent(props: any) {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-home"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Sistemas Distribuídos</div>
            </a>

            <hr className="sidebar-divider my-0"></hr>

            <SideBarItemComponent label="Home" icon="fas fa-home" />

        </ul>
    );
}

export default SideBarComponent