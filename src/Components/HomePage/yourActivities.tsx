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

    useEffect(() => {
        if (docs) {
            const items = docs.filter((obj) => obj.join.some(item => item === currentUser.uid))
            setActivities(items);
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [docs])

    return (
        <div className="activities">
            <h2 className="title title--h2 title--bold">Upcoming activities</h2>
            <div className="activities__content activities__content--green">
                {activities?.map((activity) => (
                    <article className="activities__item" key={activity.id}>
                        <Link to={`/chosen/${activity.id}`}>
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