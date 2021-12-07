// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, query, onSnapshot } from "firebase/firestore"; 
import { db } from "../../firebase-config";
import GetFromBackend from "../../hooks/getFromBackend";
import { useAuth } from '../../hooks/authentication'
import "./_activities.scss"

const FollowedTopics: React.FC = () => {
    const { docs } = GetFromBackend("topics");
    const currentUser = useAuth();
    const [allTopics, setAllTopics] = useState([]);
    const [allActivities, setAllActivities] = useState([]);
    const [followingActivities, setFollowingActivities] = useState([]);

    useEffect(() => {
        // get all topics that user is currently following
        const id = currentUser.uid        
        if (docs) {
            const topics = docs.filter((obj) => obj.following.some(user => user.userid === id))
            setAllTopics(topics)
        }

        // get all activitys from backend
        const q = query(collection(db, "activities"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            const documents = [];
            querySnapshot.forEach((doc) => {
                documents.push({...doc.data(), id: doc.id});
            });
            setAllActivities(documents);
        })
        
        // get all activities based on what topic user is following
        if (allTopics && allActivities) {
            const topicName = allTopics.map((obj) => {return obj.topic})

            const following = [...allActivities].filter((obj) => topicName.includes(obj.topic))
            setFollowingActivities(following)
        }

        return () => unsub();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [docs, allActivities])

    return (
        <div className="activities">
            <h2 className="title title--h2 title--bold">Topics you follow</h2>
            <div className="activities__content">
                {followingActivities?.map((activity) => (
                    <article className="activities__item" key={activity.id}>
                        <Link to={`/chosen/${activity.id}`}>
                            <p className="paragraph paragraph--bold paragraph--no-spacing">
                                {activity.topic} -
                                <span className="paragraph--small span"> {activity.title}</span>
                            </p>
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}
export default FollowedTopics;