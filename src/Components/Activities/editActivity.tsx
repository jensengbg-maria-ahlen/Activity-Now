// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { setDoc, doc, deleteDoc } from "@firebase/firestore";
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
    const [name, setName] = useState("")
    const [topic, setTopic] = useState("")
    const [location, setLocation] = useState("")
    const [date, setDate] = useState("")
    const [description, setDesc] = useState("")

    const handleEdit = async () => {
        const docRef = doc(db, "activities", id);
        const payload = { topic, location, date, description, name }
        setDoc(docRef, payload);
    }
    const handleCancel = async () => {
        const docRef = doc(db, "activities", id)
        await deleteDoc(docRef)
        history.push("/youractivities")
    }

    useEffect(() => {
        const obj = [...docs].find((obj) => { return obj.id === id })
        setActivity(obj)
        if (activity) {
            setName(activity.name)
            setTopic(activity.topic)
            setLocation(activity.location)
            setDesc(activity.description)
            setDate(activity.date)
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
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDesc(e.target.value)}
                                />
                            </label>
                        </form>
                        <div className="activity__buttons">
                            <ConfirmDeletion setConfirmed={handleCancel} />
                            <div className="activity__buttons--edit">
                                <Link to="/youractivities">
                                    <button className="edit-btn">Stop editing</button>
                                </Link>
                                <Link to="/youractivities">
                                    <button className="edit-btn" onClick={handleEdit}>Save activity</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </React.Fragment>
    );
}
export default EditActivity;