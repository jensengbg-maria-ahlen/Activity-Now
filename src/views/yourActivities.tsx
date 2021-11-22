// @ts-nocheck
import React from "react";
import '../Styles/_landing.scss';
import Upcoming from "../Components/upcoming";


const YourActivities: React.FC = () => {    
    return (
        <>
            <article className="mainLand">
                <Upcoming />
            </article>
        </>
    );
}
export default YourActivities;