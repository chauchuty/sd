import ContentComponent from "../components/content/content.component"
import FooterComponent from "../components/footer/footer.component"
import NavBarComponent from "../components/navbar/navbar.component"
import SideBarComponent from "../components/sidebar/sidebar.component"

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