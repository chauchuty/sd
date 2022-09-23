interface SideBarItemProps {
    label: string
    icon: string
    hasDivider?: boolean
}

function SideBarItemComponent(props: SideBarItemProps) {

    return (
        <>
            <li className="nav-item">
                <a className="nav-link">
                    <i className={props.icon}></i>
                    <span>{props.label}</span></a>
            </li>
            {props.hasDivider && <hr className="sidebar-divider my-0"></hr>}
        </>
    )
}

export default SideBarItemComponent;