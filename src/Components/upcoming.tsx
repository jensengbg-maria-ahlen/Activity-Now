// @ts-nocheck
import React from "react";
import GetFromBackend from "../hooks/getFromBackend";
import { Link } from "react-router-dom"
import '../Styles/_landing.scss';

const Upcoming: React.FC = () => {
    const { docs } = GetFromBackend("activities");
    return (
        <>
            <div>
                <h3 className="greenHeader">Upcoming activites:</h3>
                <div className="greenDiv">
                    <article className="landingArt">
                    {docs && docs.map((doc) => (
                        <div key={doc.id}>
                            <h1>Name: {doc.name}</h1>
                            <h3>Description: {doc.description}</h3>
                            <h3>Topic: {doc.topic}</h3>
                            <Link to={`/edit/${doc.id}`} >
                                <button >edit</button>
                            </Link>
                        </div>
                    ))}
                    </article>
                </div>
            </div>
        </>
    );
}
export default Upcoming;