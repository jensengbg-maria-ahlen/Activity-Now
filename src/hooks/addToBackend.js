import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, addDoc, Timestamp } from "firebase/firestore"; 

const AddToBackend = (file) => {
    const date = Timestamp.fromDate(new Date());

    useEffect(() => {
        const collectionRef = addDoc(collection(db, "activities"), {
            name: file.name,
            added: file.date,
            description: file.description,
            location: file.location,
            topic: file.topic,
            members: file.members
        })
        return collectionRef;
    }, [file, collection, addDoc])
}

export default AddToBackend;