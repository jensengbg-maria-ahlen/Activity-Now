// @ts-nocheck
import React from "react";
import { Link } from "react-router-dom";
import GetFromBackend from "../../hooks/getFromBackend";
import "./_activities.scss"

const HotTopics: React.FC = () => {
    const { docs } = GetFromBackend("activities");

    return (
        <div className="activities">
            <h2 className="title title--h2 title--bold">Popular activities</h2>
            <div className="activities__content activities__content--green">
                {docs && docs?.map((doc) => (
                    <article className="activities__item" key={doc.id}>
                        <Link to={`/chosen/${doc.id}`}>
                            <p className="paragraph paragraph--bold paragraph--no-spacing">
                                {doc.start} -
                                <span className="paragraph--small span"> {doc.title}</span>
                            </p>
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}
export default HotTopics;