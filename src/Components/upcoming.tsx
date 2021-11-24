// @ts-nocheck
import React from "react";
import { Link } from "react-router-dom"
import GetFromBackend from "../hooks/getFromBackend";
import '../Styles/_landing.scss';
import "../Styles/_buttons.scss";

const Upcoming: React.FC = () => {
    const { docs } = GetFromBackend("activities");
    return (
        <>
            <div>
                <h3 className="greenHeader">Upcoming activites:</h3>
                <article className="landingArt">
                    <div className="greenDiv">
                        {docs && docs.map((doc) => (
                            <div key={doc.id}>
                                <h1>Name: {doc.name}</h1>
                                <h3>Description: {doc.description}</h3>
                                <h3>Topic: {doc.topic}</h3>
                                <Link to={`/edit/${doc.id}`} >
                                    <button className="edit-btn" >edit</button>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <Link to={`/createactivity`} >
                        <button className="create-btn">Create New</button>
                    </Link>
                </article>
            </div>
        </>
    );
}
export default Upcoming;