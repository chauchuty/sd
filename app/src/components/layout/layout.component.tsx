import ContentComponent from "./content/content.component"
import FooterComponent from "./footer/footer.component"
import NavBarComponent from "./navbar/navbar.component"
import SideBarComponent from "./sidebar/sidebar.component"

function LayoutComponent(props: any) {
    return (
        <div id="wrapper">
            <SideBarComponent />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <NavBarComponent />
                    <ContentComponent />
                </div>
                <FooterComponent />
            </div>
        </div>
    )
}

export default LayoutComponent