// @ts-nocheck
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";
import "./_nav.scss";

type NavProps = {
  isMobile: boolean,
  handleCloseMenu: () => void;
}

const NavBar: React.FC<NavProps> = (props: NavProps) => {
  return (
    <div className="nav-bar">
      <Navigation {...props} />
      <MobileNavigation />
    </div>
  )
}

export default NavBar