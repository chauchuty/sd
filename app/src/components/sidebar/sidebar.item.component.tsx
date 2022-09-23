import { useEffect } from "react";

interface SideBarItemAnchorProps {
    href: string;
    label: string
}

interface SideBarItemProps {
    label: string
    hasDivider?: boolean
    isDropDown?: boolean;
    anchors?: SideBarItemAnchorProps[];
}

function SideBarItemComponent(props: SideBarItemProps) {

    return (
        <>


            <li className="nav-item">
                {
                    !props.isDropDown ? (
                        <a className="nav-link" href="index.html">
                            <i className="fas fa-fw fa-tachometer-alt"></i>
                            <span>{props.label}</span></a>
                    ) : (
                        <>
                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                                aria-expanded="true" aria-controls="collapseUtilities">
                                <i className="fas fa-fw fa-wrench"></i>
                                <span>{props.label}</span>
                            </a>
                            <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                                data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    {
                                        props.anchors?.map((anchor, index) => {
                                            return (
                                                <a className="collapse-item" href={anchor.href} key={index}>{anchor.label}</a>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </>
                    )
                }
            </li>
            {
                props.hasDivider && <hr className="sidebar-divider" />
            }
        </>
    )
}

export default SideBarItemComponent;