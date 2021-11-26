// @ts-nocheck
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { collection, addDoc } from "@firebase/firestore";
import { db } from "../../firebase-config";
import "./_activity.scss";
import "../../Styles/_buttons.scss";

const NewActivity: React.FC = () => {
    const [topic, setTopic] = useState("")
    const [location, setLocation] = useState("")
    const [date, setDate] = useState("")
    const [description, setDesc] = useState("")
    const [name, setName] = useState("")

    const handleSubmit = async e => {
        e.preventDefault()
        const collectionRef = collection(db, "activities")
        const payload = { topic, location, date, description, name };
        console.log("collectionRef", collectionRef);
        console.log("payload", payload);
        const docRef = await addDoc(collectionRef, payload);
        console.log("The new ID is: " + docRef.id);
        setTopic("")
        setDesc("")
    }

    return (
        <div className="activity">
            <div className="activity__content">
                <h2 className="title title--h2">Create new activity</h2>
                <form className="activity__form">
                    <label className="activity__form--item">
                        <p className="paragraph paragraph--bold">Name:</p>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                        />
                    </label>
                    <label className="activity__form--item">
                        <p className="paragraph paragraph--bold">Date:</p>
                        <input
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            type="datetime-local"
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
                        <input
                            value={description}
                            onChange={(e) => setDesc(e.target.value)}
                            type="text"
                        />
                    </label>
                </form>
                <div className="activity__buttons">
                    <Link to="/youractivities">
                        <button className="cancel-btn">Cancel</button>
                    </Link>
                    <button className="create-btn" onClick={handleSubmit}>Create activity</button>
                </div>
            </div>
        </div>
    );
}
export default NewActivity;