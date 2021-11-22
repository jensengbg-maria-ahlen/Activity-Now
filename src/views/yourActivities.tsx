// @ts-nocheck
import React from "react";
import {Link} from "react-router-dom"
import '../Styles/_landing.scss';
import Upcoming from "../Components/upcoming";
import GetFromBackend from "../hooks/getFromBackend";

const YourActivities: React.FC = () => {
    const { docs } = GetFromBackend("activities");  
    
    //Need to send props with id?  

    return (
        <>
            <article className="mainLand">
                <Upcoming />
                <div>
                    In Backend: 
                    {docs && docs.map((doc) => (
                        <div className="temp" key={doc.id}>
                            <h1>Name: {doc.name}</h1>
                            <h3>Desc: {doc.description}</h3>
                            <h3> topic: {doc.topic}</h3>
                            <Link to={`/edit/${doc.id}`} >
                                <button >edit</button>
                            </Link>
                        </div>
                    ))}
                    
                </div>
            </article>
        </>
    );
}
export default YourActivities;