// @ts-nocheck
import React, { useState } from "react";
import { CgMenu, CgClose } from "react-icons/cg"
import NavLinks from "./NavLinks";
import "./_nav.scss"

const MobileNavigation: React.FC = () => {
    const [active, setActive] = useState(false)

    const openIcon = <CgMenu 
        className="nav-bar__hamburger" 
        size="40px" 
        color="#171E20" 
        onClick={() => setActive(true)} 
    />
    const closeIcon = <CgClose 
        className="nav-bar__hamburger" 
        size="40px" 
        color="#171E20"
        onClick={() => setActive(false)} 
    />

    const handleCloseMenu = () => {
        setActive(false);
    }

    return (
        <nav className="nav-bar__mobile-navigation">
            {active ? closeIcon : openIcon}  
            {active && <NavLinks isMobile={true} handleCloseMenu={handleCloseMenu} />}    
        </nav>
    )
}

export default MobileNavigation