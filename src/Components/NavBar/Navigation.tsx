import React from "react";
import NavLinks from "./NavLinks";
import "./_nav.scss"

type NavProps = {
    isMobile: boolean,
    handleCloseMenu: () => void;
}

const Navigation: React.FC<NavProps> = (props: NavProps) => {
    return (
        <nav className="nav-bar__navigation">
            <NavLinks {...props} />
        </nav>
    )
}

export default Navigation