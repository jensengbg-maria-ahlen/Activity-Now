import React from "react";
import { Link } from "react-router-dom";
import "./_nav.scss";

type NavProps = {
    isMobile: boolean,
    handleCloseMenu: () => void;
}

const NavLinks: React.FC<NavProps> = (props: NavProps) => {
    return (
        <ul className="nav-bar__list">
            <li className="nav-bar__list-item" onClick={() => props.isMobile && props.handleCloseMenu()}>
                <Link to="/">
                    <h3 className="title title--h3 title--bold">Home</h3>
                </Link>
            </li>
            <li className="nav-bar__list-item" onClick={() => props.isMobile && props.handleCloseMenu()}>
                <Link to="/profile">
                    <h3 className="title title--h3 title--bold">Profile</h3>
                </Link>
            </li>
            <li className="nav-bar__list-item" onClick={() => props.isMobile && props.handleCloseMenu()}>
                <Link to="/calendar">
                    <h3 className="title title--h3 title--bold">Calendar</h3>
                </Link>
            </li>
            <li className="nav-bar__list-item" onClick={() => props.isMobile && props.handleCloseMenu()}>
                <Link to="/youractivities">
                    <h3 className="title title--h3 title--bold">Your Activities</h3>
                </Link>
            </li>
        </ul>
    )
}

export default NavLinks