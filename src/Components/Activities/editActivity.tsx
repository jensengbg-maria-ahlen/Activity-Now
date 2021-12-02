// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
    collection,
    query,
    onSnapshot,
    doc,
    arrayUnion,
    updateDoc,
    deleteDoc,
    arrayRemove
} from "@firebase/firestore";
import GetFromBackend from "../../hooks/getFromBackend";
import { db } from "../../firebase-config";
import ConfirmDeletion from "../HandleConfirm/confirmDeletetion";
import "./_activity.scss";
import "../../Styles/_buttons.scss";

const EditActivity: React.FC = () => {
    const history = useHistory()
    let { id } = useParams()
    const { docs } = GetFromBackend("activities");
    const [activity, setActivity] = useState(null)
    const [title, setTitle] = useState("")
    const [allTopics, setAllTopics] = useState([])
    const [oldTopic, setOldTopic] = useState("");
    const [chosenTopic, setChosenTopic] = useState("")
    const [time, setTime] = useState("")
    const [location, setLocation] = useState("")
    const [date, setDate] = useState("")
    const [description, setDesc] = useState("")

    const handleEdit = async () => {
        // Update Topics in backend
        const currentTopic = docs.find((obj) => obj.topic === oldTopic)
        const newTopic = docs.find((obj) => obj.topic === chosenTopic)

        if (newTopic !== currentTopic) {
            // update new topic
            const newTopicRef = doc(db, "topics", newTopic.id)
            await updateDoc(newTopicRef, {
                activities: arrayUnion({title: title}),
                following: arrayUnion({userid: currentUser.uid})
            })

            // update current topic
            const oldTopicRef = doc(db, "topics", currentTopic.id)
            await updateDoc(oldTopicRef, {
                activities: arrayRemove({title: title})
            } )
        }        

        // Update chosen Activity
        const docRef = doc(db, "activities", id);
        const payload = {
            topic: chosenTopic,
            location: location,
            start: date,
            end: date,
            time: time,
            description: description,
            title: title,
        };
        updateDoc(docRef, payload);
        history.goBack()
    }

    const handleCancel = async () => {
        const docRef = doc(db, "activities", id)
        await deleteDoc(docRef)

        const topic = docs.find((obj) => obj.topic === oldTopic)
        const topicRef = doc(db, "topics", topic.id)
        await updateDoc(topicRef, {
            activities: arrayRemove({title: title})
        })

        history.goBack()
    }


    useEffect(() => {
        if (docs) {
            const obj = [...docs].find((obj) => { return obj.id === id })
            setActivity(obj)
        }

        if (activity) {
            setTitle(activity.title)
            setOldTopic(activity.topic)
            setChosenTopic(activity.topic)
            setLocation(activity.location)
            setDesc(activity.description)
            setDate(activity.start)
            setTime(activity.time)
        }

        // get all topics from backend
        const q = query(collection(db, "topics"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            const documents = [];
            querySnapshot.forEach((doc) => {
                documents.push({ ...doc.data(), id: doc.id });
            });
            const topics = [...documents].map((obj) => {
                return obj.topic
            })
            setAllTopics([...topics])
        })

        return () => unsub();

    }, [activity, docs, id, allTopics])

    return (
        <React.Fragment >
            {activity ? (
                <div className="activity">
                    <div className="activity__content">
                        <h2 className="title title--h2">Edit activity:
                            <span className="title--bold"> {activity.name}</span>
                        </h2>
                        <form className="activity__form">
                            <label className="activity__form--item">
                                <p className="paragraph paragraph--bold">Name:</p>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </label>
                            <label className="activity__form--item">
                                <p className="paragraph paragraph--bold">Date:</p>
                                <input
                                    type="text"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
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
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </label>
                            <label className="activity__form--item">
                                <p className="paragraph paragraph--bold">Topic:</p>
                                <select name="topics" value={chosenTopic} onChange={(e) => setChosenTopic(e.target.value)}>
                                    {allTopics?.map((obj) => (
                                        <option value={obj} key={obj}>{obj}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="activity__form--item">
                                <p className="paragraph paragraph--bold">Description:</p>
                                <textarea
                                    rows="5"
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDesc(e.target.value)}
                                />
                            </label>
                        </form>
                        <div className="activity__buttons">
                            <ConfirmDeletion setConfirmed={handleCancel} />
                            <div className="activity__buttons--edit">
                                <button className="edit-btn" onClick={history.goBack}>Stop editing</button>
                                <button className="edit-btn" onClick={handleEdit}>Save activity</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </React.Fragment>
    );
}
export default EditActivity;