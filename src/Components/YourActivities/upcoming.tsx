// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import GetFromBackend from "../../hooks/getFromBackend";
import { useAuth } from '../../hooks/authentication'
import "./_upcoming.scss";
import "../../Styles/_buttons.scss";

const Upcoming: React.FC = () => {
    const { docs } = GetFromBackend("activities");
    const currentUser = useAuth();
    const [activities, setActivities] = useState([]);

    const yourActivities = () => {
        if (docs) {
            const id = currentUser.uid
            const items = docs.filter((obj) => obj.creator === id)
            setActivities([...items]);
        }
    }

    useEffect(() => {
        yourActivities()
    }, [docs])

    return (
        <div className="upcoming">
            <div className="upcoming__content">
                <h2 className="title title--h2">Activites you created:</h2>
                <div className="upcoming__activities">
                    {activities.map((activity) => (
                        <div key={activity.id} className="upcoming__item">
                            <div className="upcoming__item--content">
                                <p className="paragraph">
                                    Name: 
                                    <span className="paragraph paragraph--bold paragraph--small">
                                        {activity.name}
                                    </span>
                                </p>
                                <p className="paragraph">
                                    Description: 
                                    <span className="paragraph paragraph--bold paragraph--small">
                                        {activity.description}
                                    </span>
                                </p>
                                <p className="paragraph">
                                    Topic: 
                                    <span className="paragraph paragraph--bold paragraph--small">
                                        {activity.topic}
                                    </span>
                                </p>
                            </div>
                            <Link to={`/edit/${activity.id}`} >
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