// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { collection, addDoc } from "@firebase/firestore";
import { useAuth } from '../../hooks/authentication'
import { db } from "../../firebase-config";
import "./_activity.scss";
import "../../Styles/_buttons.scss";

const NewActivity: React.FC = () => {
    const currentUser = useAuth();
    const [topic, setTopic] = useState("")
    const [location, setLocation] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [description, setDesc] = useState("")
    const [title, setTitle] = useState("")
    const [disabled, setDisabled] = useState(true);
    const history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault()
        const collectionRef = collection(db, "activities")
        const payload = { 
            topic: topic, 
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
        if (
            topic !== "" &&
            location !== "" &&
            date !== "" &&
            time !== "" &&
            description !== "" &&
            title !== "") {
            setDisabled(false);
        }
    },[topic, location, date, time, description, title, setDisabled])

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
                        <input
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            type="text"
                        />
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