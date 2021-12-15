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
    const today = new Date();

    useEffect(() => {
        if (docs) {
            const items = docs.filter((obj) => obj.creator === currentUser.uid)
            setActivities(items);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [docs])

    return (
        <div className="upcoming">
            <div className="upcoming__button">
                    <Link to={`/createactivity`} >
                        <button className="create-btn">Create New</button>
                    </Link>
                </div>
            <div className="upcoming__content">
                <div className="upcoming__old">
                    <h2 className="title title--h2">Your old activities:</h2>
                    <div className="upcoming__activities">
                    {activities.map((activity) => {
                            if (activity.start <= today.toISOString().split('T')[0]) {
                                return (
                                    <div key={activity.id} className="upcoming__item">
                                        <div className="upcoming__item--content">
                                            <p className="paragraph">
                                                Name:{" "}
                                                <span className="paragraph paragraph--bold paragraph--small">
                                                    {activity.title}
                                                </span>
                                            </p>
                                            <p className="paragraph">
                                                Description: {" "}
                                                <span className="paragraph paragraph--bold paragraph--small">
                                                    {activity.description}
                                                </span>
                                            </p>
                                            <p className="paragraph">
                                                Topic: {" "}
                                                <span className="paragraph paragraph--bold paragraph--small">
                                                    {activity.topic}
                                                </span>
                                            </p>
                                        </div>
                                        <Link to={`/chosen/${activity.id}`} >
                                            <button className="edit-btn" >Show details</button>
                                        </Link>
                                    </div>
                                )
                            } else {
                                return null
                            }
                        })}
                    </div>
                </div>
                <div className="upcoming__new">
                    <h2 className="title title--h2">Your new activities:</h2>
                    <div className="upcoming__activities">
                        {activities.map((activity) => {
                            if (activity.start >= today.toISOString().split('T')[0]) {
                                return (
                                    <div key={activity.id} className="upcoming__item">
                                        <div className="upcoming__item--content">
                                            <p className="paragraph">
                                                Name:{" "}
                                                <span className="paragraph paragraph--bold paragraph--small">
                                                    {activity.title}
                                                </span>
                                            </p>
                                            <p className="paragraph">
                                                Description: {" "}
                                                <span className="paragraph paragraph--bold paragraph--small">
                                                    {activity.description}
                                                </span>
                                            </p>
                                            <p className="paragraph">
                                                Topic: {" "}
                                                <span className="paragraph paragraph--bold paragraph--small">
                                                    {activity.topic}
                                                </span>
                                            </p>
                                        </div>
                                        <Link to={`/edit/${activity.id}`} >
                                            <button className="edit-btn" >edit</button>
                                        </Link>
                                    </div>
                                )
                            } else {
                                return null
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Upcoming;