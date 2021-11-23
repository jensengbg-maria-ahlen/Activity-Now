import NavLinks from "./NavLinks";
import { CgMenuRound, CgCloseO } from "react-icons/cg"
import "../../Styles/_nav.scss"
import { useState } from "react";

const MobileNavigation = () => {
    const [active, setActive] = useState(false)

    const openIcon = <CgMenuRound 
        className="nav-bar__hamburger" 
        size="50px" 
        color="#171E20" 
        onClick={() => setActive(true)} 
    />
    const closeIcon = <CgCloseO 
        className="nav-bar__hamburger" 
        size="50px" 
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