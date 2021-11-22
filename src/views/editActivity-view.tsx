// @ts-nocheck
import React from "react";
import '../Styles/_activity.scss';
import { useState } from "react";
import GetFromBackend from "../hooks/getFromBackend";
import { db } from "../firebase-config";
import { setDoc, doc } from "@firebase/firestore";

const EditView: React.FC = () => {
    const [topic, setTopic] = useState("")
    const handleEdit = async(id) => {
        const docRef = doc(db, "activities", id);
        const payload = { topic }
        setDoc(docRef, payload);
    }//Cannot find id "n.indexOf is not a function"
    return (
        <div className="newActivityDiv">
            <section>
                <h2>Edit activity, {doc.name}</h2>
            </section>
            <article className="greenArt">
                <h4>Date:</h4>
                
                <h4>Location:</h4>
                <h4>Topic:</h4>
                <input type="text" value={topic} 
                onChange={(e) => setTopic(e.target.value)}/>
                <h4>Description:</h4>
                <section className="buttonSection">
                    <button className="cancelBtn">Cancel activity</button>
                    <button className="editBtn">Stop editing</button>
                    <button className="editBtn" onClick={handleEdit}>Save activity</button>
                </section>
            </article>
        </div>
    );
}
export default EditView;