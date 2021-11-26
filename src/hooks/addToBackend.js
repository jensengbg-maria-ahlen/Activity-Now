// @ts-nocheck
import { useEffect } from "react";
import { collection, addDoc} from "firebase/firestore"; 
import { db } from "../firebase-config";

const AddActivityToBackend = (file) => {
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

export default AddActivityToBackend