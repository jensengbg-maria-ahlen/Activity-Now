// @ts-nocheck
import React from "react";
import { Link } from "react-router-dom"
import GetFromBackend from "../../hooks/getFromBackend";
import "./_upcoming.scss";
import "../../Styles/_buttons.scss";

const Upcoming: React.FC = () => {
    const { docs } = GetFromBackend("activities");
    return (
        <div className="upcoming">
            <div className="upcoming__content">
                <h2 className="title title--h2">Upcoming activites:</h2>
                <div className="upcoming__activities">
                    {docs && docs.map((doc) => (
                        <div key={doc.id} className="upcoming__item">
                            <div className="upcoming__item--content">
                                <p className="paragraph">
                                    Name: 
                                    <span className="paragraph paragraph--bold paragraph--small">
                                        {doc.name}
                                    </span>
                                </p>
                                <p className="paragraph">
                                    Description: 
                                    <span className="paragraph paragraph--bold paragraph--small">
                                        {doc.description}
                                    </span>
                                </p>
                                <p className="paragraph">
                                    Topic: 
                                    <span className="paragraph paragraph--bold paragraph--small">
                                        {doc.topic}
                                    </span>
                                </p>
                            </div>
                            <Link to={`/edit/${doc.id}`} >
                                <button className="edit-btn" >edit</button>
                            </Link>
                        </div>
                    ))}
                </div>
                <Link to={`/createactivity`} >
                    <button className="create-btn">Create New</button>
                </Link>
            </div>
        </div>
    );
}
export default Upcoming;