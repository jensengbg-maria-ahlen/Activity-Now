// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GetFromBackend from "../../hooks/getFromBackend";
import { useAuth } from '../../hooks/authentication'
import "./_activities.scss"

const YourActivity: React.FC = () => {
    const { docs } = GetFromBackend("activities");
    const currentUser = useAuth();
    const [activities, setActivities] = useState([]);

    const yourActivities = () => {
        const id = currentUser.uid
        const items = docs.filter((obj) => {
            return obj?.creator === id
        })
        setActivities([...items]);
    }

    useEffect(() => {
        yourActivities()
    }, [docs])

    return (
        <div className="activities">
            <h2 className="title title--h2 title--bold">Your activities</h2>
            <div className="activities__content activities__content--green">
                {docs && activities?.map((activity) => (
                    <article className="activities__item" key={activity.creator}>
                        <Link to={`/edit/${activity.id}`}>
                            <p className="paragraph paragraph--bold paragraph--no-spacing">
                                {activity.startDate} -
                                <span className="paragraph--small span"> {activity.title}</span>
                            </p>
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}
export default YourActivity;