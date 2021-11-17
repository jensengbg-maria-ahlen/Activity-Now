// @ts-nocheck
import React from "react";
import '../Styles/_landing.scss';
import Upcoming from "../Components/upcoming";
import GetFromBackend from "../hooks/getFromBackend";

const YourActivities: React.FC = () => {
    const { docs } = GetFromBackend("activities");    

    return (
        <>
            <article className="mainLand">
                <Upcoming />
                <div>
                    In Backend: 
                    {docs && docs.map((doc) => (
                        <div key={doc.id}>
                            <h1>{doc.name}</h1>
                            <h3>{doc.description}</h3>
                        </div>
                    ))}
                </div>
            </article>
        </>
    );
}
export default YourActivities;