// @ts-nocheck
import React from "react";
import '../Styles/_activity.scss';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import GetFromBackend from "../hooks/getFromBackend";
import { db } from "../firebase-config";
import { setDoc, doc, deleteDoc } from "@firebase/firestore";

const EditView: React.FC = () => {
    let { id } = useParams()
    const { docs } = GetFromBackend("activities");
    const [activity, setActivity] = useState(null)
    const [topic, setTopic] = useState("")
    const [location, setLocation] = useState("")
    const [date, setDate] = useState("")
    const [description, setDesc] = useState("")
    const [name, setName] = useState("")

    useEffect(() => {
        const index = [...docs].find((obj) => { return obj.id === id })
        setActivity(index)
    }, [activity, docs, id])

    const handleEdit = async () => {
        const docRef = doc(db, "activities", id);
        const payload = { topic, location, date, description, name}
        setDoc(docRef, payload);
    }
    const handleCancel = async () => {
        const docRef = doc(db, "activities", id)
        await deleteDoc(docRef);
        console.log(docRef, 'this is docref')
    }

    return (
        <React.Fragment >{activity ? (
            <div className="newActivityDiv" >
                <section>
                    <h2>Edit activity, {activity.name}</h2>
                </section>
                <article className="greenArt">
                    <h4>Name:</h4>
                    <input value={activity.name} 
                    onChange={(e) => setName(e.target.value)}  type="text" />
                    <h4>Date:</h4>
                    <input type="text" value={activity.date}
                        onChange={(e) => setDate(e.target.value)} />
                    <h4>Location:</h4>
                    <input type="text" value={activity.location}
                        onChange={(e) => setLocation(e.target.value)} />
                    <h4>Topic:</h4>
                    <input type="text" value={activity.topic} 
                        onChange={(e) => setTopic(e.target.value)} />
                    <h4>Description:</h4>
                    <input value={activity.description} 
                    onChange={(e) => setDesc(e.target.value)}  type="text" />
                    <section className="buttonSection">
                        <button className="cancelBtn" onClick={handleCancel}>Cancel activity</button>
                        <button className="editBtn">Stop editing</button>
                        <button className="editBtn" onClick={handleEdit}>Save activity</button>
                    </section>
                </article>
            </div>
        ) : null
        }
        </React.Fragment>
    );
}
export default EditView;