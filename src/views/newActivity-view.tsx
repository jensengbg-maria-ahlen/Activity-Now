// @ts-nocheck
import React from "react";
import {useState} from "react"
import '../Styles/_activity.scss';
import { db } from "../firebase-config";
import { collection, addDoc } from "@firebase/firestore";

const NewActivityView: React.FC = () => {
    const [topic, setTopic] = useState("")
    const [location, setLocation] = useState("")
    const [date, setDate] = useState("")
    const [description, setDesc] = useState("")
    const [name, setName] = useState("")

    const handleSubmit = async e => {
        e.preventDefault()
        const collectionRef = collection(db, "activities")
        const payload = { topic, location, date, description, name};
        const docRef = await addDoc(collectionRef, payload);
        console.log("The new ID is: " + docRef.id);
        setTopic("")
        setDesc("")
    }

    return (
        <div className="newActivityDiv">
            <section>
                <h2>Create new activity</h2>
            </section>
            <form className="greenArt" onSubmit={handleSubmit}>
            <h4>Name:</h4>
                <input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    type="text"
                />
                <h4>Date:</h4>
                <input 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    type="text" 
                />
                <h4>Location:</h4>
                <input 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    type="text" 
                />
                <h4>Topic:</h4>
                <input 
                    value={topic} 
                    onChange={(e) => setTopic(e.target.value)}  
                    type="text" 
                />
                <h4>Description:</h4> 
                <input 
                    value={description} 
                    onChange={(e) => setDesc(e.target.value)} 
                    type="text"
                />
                <button className="createBtn">Create activity</button>
            </form>
        </div>
    );
}
export default NewActivityView;