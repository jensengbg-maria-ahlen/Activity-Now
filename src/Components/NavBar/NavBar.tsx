// @ts-nocheck
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";
import "./_nav.scss";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <Navigation />
      <MobileNavigation />
    </div>
  )
}

export default NavBar