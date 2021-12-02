// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GetFromBackend from "../../hooks/getFromBackend";
import { useAuth } from '../../hooks/authentication'
import "./_activities.scss"

const UpcomingActivity: React.FC = () => {
    const { docs } = GetFromBackend("activities");
    const currentUser = useAuth();
    const [activities, setActivities] = useState([]);

    const yourActivities = () => {
        if (docs) {
            const id = currentUser.uid
            const items = docs.filter((obj) => obj.join.some(item => item === id))
            setActivities([...items]);
        }
    }


    useEffect(() => {
        yourActivities()
    }, [docs])

    return (
        <div className="activities">
            <h2 className="title title--h2 title--bold">Upcoming activities</h2>
            <div className="activities__content activities__content--green">
                {activities?.map((activity) => (
                    <article className="activities__item" key={activity.id}>
                        <Link to={`/edit/${activity.id}`}>
                            <p className="paragraph paragraph--bold paragraph--no-spacing">
                                {activity.start} -
                                <span className="paragraph--small span"> {activity.title}</span>
                            </p>
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}
export default UpcomingActivity;