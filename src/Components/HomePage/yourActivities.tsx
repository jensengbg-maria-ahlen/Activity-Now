// @ts-nocheck
import React, { useEffect, useState } from "react";
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
            return obj?.uid === id
        })
        setActivities([...items]);
    }

    useEffect(() => {
        yourActivities()
    }, [])

    return (
        <div className="activities">
            <h2 className="title title--h2 title--bold">Your activities</h2>
            <div className="activities__content activities__content--green">
                {docs && activities?.map((activity) => (
                    <article className="activities__item" key={activity.uid}>
                        <p className="paragraph paragraph--bold paragraph--no-spacing">
                            {activity.date} -
                            <span className="paragraph--small span"> {activity.name}</span>
                        </p>
                    </article>
                ))}
            </div>
        </div>
    );
}
export default YourActivity;