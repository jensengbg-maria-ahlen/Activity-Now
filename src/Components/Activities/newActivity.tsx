// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { collection, addDoc, doc, updateDoc, arrayUnion } from "@firebase/firestore";
import { useAuth } from '../../hooks/authentication'
import { db } from "../../firebase-config";
import GetFromBackend from "../../hooks/getFromBackend";
import "./_activity.scss";
import "../../Styles/_buttons.scss";

const NewActivity: React.FC = () => {
    const currentUser = useAuth();
    const { docs } = GetFromBackend("topics");
    const [allTopics, setAllTopics] = useState([])
    const [chosenTopic, setChosenTopic] = useState("")
    const [location, setLocation] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [description, setDesc] = useState("")
    const [title, setTitle] = useState("")
    const [disabled, setDisabled] = useState(true);
    const history = useHistory();


    const handleSubmit = async e => {
        e.preventDefault()

        // Update Topics in backend
        const topic = docs.find((obj) => obj.topic === chosenTopic)
        const topicRef = doc(db, "topics", topic.id)
        await updateDoc(topicRef, {
            activities: arrayUnion({title: title}),
            following: arrayUnion({userid: currentUser.uid})
        })

        // Update Activities in backend
        const collectionRef = collection(db, "activities")
        const payload = {
            topic: chosenTopic,
            location: location,
            start: date,
            end: date,
            time: time,
            description: description,
            title: title,
            creator: currentUser.uid,
            join: []
        };
        const docRef = await addDoc(collectionRef, payload);
        history.push("/youractivities");
        return docRef;
    }

    useEffect(() => {
        if (docs) {
            const topics = [...docs].map((obj) => {
                return obj.topic
            })
            setAllTopics([...topics])
        }
        if (
            chosenTopic !== "" &&
            location !== "" &&
            date !== "" &&
            time !== "" &&
            description !== "" &&
            title !== "") {
            setDisabled(false);
        }
        
    }, [docs, location, date, time, description, title, chosenTopic, setDisabled])

    return (
        <div className="activity">
            <div className="activity__content">
                <h2 className="title title--h2">Create new activity</h2>
                <form className="activity__form">
                    <label className="activity__form--item">
                        <p className="paragraph paragraph--bold">Name:</p>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                        />
                    </label>
                    <label className="activity__form--item">
                        <p className="paragraph paragraph--bold">Date:</p>
                        <input
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            type="date"
                        />
                    </label>
                    <label className="activity__form--item">
                        <p className="paragraph paragraph--bold">Time:</p>
                        <input
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            type="time"
                        />
                    </label>
                    <label className="activity__form--item">
                        <p className="paragraph paragraph--bold">Location:</p>
                        <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            type="text"
                        />
                    </label>
                    <label className="activity__form--item">
                        <p className="paragraph paragraph--bold">Topic:</p>
                        <select name="topics" value={chosenTopic} onChange={(e) => setChosenTopic(e.target.value)}>
                            <option value="empty"></option>
                            {allTopics?.map((obj) => (
                                <option value={obj} key={obj}>{obj}</option>
                            ))}
                        </select>
                    </label>
                    <label className="activity__form--item">
                        <p className="paragraph paragraph--bold">Description:</p>
                        <textarea
                            rows="5"
                            value={description}
                            onChange={(e) => setDesc(e.target.value)}
                            type="text"
                        />
                    </label>
                </form>
                <div className="activity__buttons">
                    <button className="cancel-btn" onClick={history.goBack}>Cancel</button>
                    <button disabled={disabled} className="create-btn" onClick={handleSubmit}>Create activity</button>
                </div>
            </div>
        </div>
    );
}
export default NewActivity;