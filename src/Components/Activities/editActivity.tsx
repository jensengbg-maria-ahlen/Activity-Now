// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { setDoc, doc, deleteDoc } from "@firebase/firestore";
import { useAuth } from '../../hooks/authentication'
import GetFromBackend from "../../hooks/getFromBackend";
import { db } from "../../firebase-config";
import ConfirmDeletion from "../HandleConfirm/confirmDeletetion";
import "./_activity.scss";
import "../../Styles/_buttons.scss";

const EditActivity: React.FC = () => {
    const history = useHistory()
    let { id } = useParams()
    const currentUser = useAuth()
    const { docs } = GetFromBackend("activities");
    const [activity, setActivity] = useState(null)
    const [title, setTitle] = useState("")
    const [topic, setTopic] = useState("")
    const [time, setTime] = useState("")
    const [location, setLocation] = useState("")
    const [date, setDate] = useState("")
    const [description, setDesc] = useState("")

    const handleEdit = async () => {
        const docRef = doc(db, "activities", id);
        const payload = {
            topic: topic,
            location: location,
            startDate: date,
            endDate: date,
            time: time,
            description: description,
            title: title,
            creator: currentUser.uid
        };
        setDoc(docRef, payload);
        history.goBack
    }
    const handleCancel = async () => {
        const docRef = doc(db, "activities", id)
        await deleteDoc(docRef)
        history.goBack
    }

    useEffect(() => {
        const obj = [...docs].find((obj) => { return obj.id === id })
        setActivity(obj)
        if (activity) {
            setTitle(activity.title)
            setTopic(activity.topic)
            setLocation(activity.location)
            setDesc(activity.description)
            setDate(activity.startDate)
            setTime(activity.time)
        }
    }, [activity, docs, id])

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
                                <input
                                    type="text"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                />
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