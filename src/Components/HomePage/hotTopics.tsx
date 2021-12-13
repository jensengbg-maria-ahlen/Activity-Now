// @ts-nocheck
import React from "react";
import { Link } from "react-router-dom";
import GetFromBackend from "../../hooks/getFromBackend";
import { useEffect, useState } from "react"
import "./_activities.scss"

const HotTopics: React.FC = () => {
    const { docs } = GetFromBackend("activities");
    const [popular, setPopular] = useState<string[]>([])
    const today = new Date();

    useEffect(() => {
        const popularActivities = [...docs].filter((obj) => {
            return obj.join.length >= 3

        })
        setPopular(popularActivities)
    }, [docs])

    return (
        <div className="activities">
            <h2 className="title title--h2 title--bold">Popular activities</h2>
            <div className="activities__content activities__content--green">
                {popular?.map((doc) => {
                    if (doc.start >= today.toISOString().split('T')[0]) {
                        return (
                            <article className="activities__item" key={doc.id}>
                                <Link to={`/chosen/${doc.id}`}>
                                    <p className="paragraph paragraph--bold paragraph--no-spacing">
                                        {doc.start} -
                                        <span className="paragraph--small span"> {doc.title}</span>
                                    </p>
                                </Link>
                            </article>
                        )
                    } else {
                        return null
                    }
                })}
            </div>
        </div>
    );
}
export default HotTopics;