// @ts-nocheck
import React, { useEffect, useState } from "react";
import GetFromBackend from "../../hooks/getFromBackend";
import { useAuth } from '../../hooks/authentication'
import "./_activities.scss"

const FollowedTopics: React.FC = () => {
    const { docs } = GetFromBackend("activities");
    const currentUser = useAuth();
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const topic = currentUser.topic
        const items = docs.filter((obj) => {
            return obj?.topic === topic
        })
        setTopics([...items]);
    }, [])

    return (
        <div className="activities">
            <h2 className="title title--h2 title--bold">Topics you follow</h2>
            <div className="activities__content">
                <article className="activities__item">
                    <p className="paragraph paragraph--bold paragraph--no-spacing">
                        11/11 -
                        <span className="paragraph--small span"> Tea-party!</span>
                    </p>
                </article>
            </div>
        </div>
    );
}
export default FollowedTopics;