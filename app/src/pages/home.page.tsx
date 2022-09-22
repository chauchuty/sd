import ContentComponent from "../components/layout/content/content.component"
import FooterComponent from "../components/layout/footer/footer.component"
import NavBarComponent from "../components/layout/navbar/navbar.component"
import SideBarComponent from "../components/layout/sidebar/sidebar.component"

function HomePage(props: any) {
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

export default HomePage