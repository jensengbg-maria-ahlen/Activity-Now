import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";

import "../../Styles/_nav.scss";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <Navigation />
      <MobileNavigation />
    </div>
  )
}

export default NavBar