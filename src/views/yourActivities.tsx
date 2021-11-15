// @ts-nocheck
import React from "react";
//import { Link } from "react-router-dom";
import '../Styles/_landing.scss';
import Upcoming from "../Components/upcoming";

const YourActivities: React.FC = () => {

//Make each of the 3 main divs to components?
    return (
        <>
            <article className="mainLand">
                <Upcoming />
            </article>
        </>
    );
}
export default YourActivities;