// @ts-nocheck
import React from "react";
import '../Styles/_activity.scss';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import GetFromBackend from "../hooks/getFromBackend";
import { db } from "../firebase-config";
import { setDoc, doc, deleteDoc, getDoc } from "@firebase/firestore";

const EditView: React.FC = () => {
    let { id } = useParams()
    const { docs } = GetFromBackend("activities");
    const [activity, setActivity] = useState(null)


    useEffect(() => {
        const index = [...docs].find((obj) => { return obj.id === id })
        setActivity(index)
    }, [activity, docs, id])


    console.log('this is id,', id)
    const [topic, setTopic] = useState("")
    const handleEdit = async (id) => {
        const docRef = doc(db, "activities", id);
        const payload = { topic }
        setDoc(docRef, payload);
    }
    const handleCancel = async (id) => {
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
                    <h4>Date:</h4>
                    <h4>Location:</h4>
                    <h4>Topic:</h4>
                    <input type="text" value={topic}
                        onChange={(e) => setTopic(e.target.value)} />
                    <h4>Description:</h4>
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