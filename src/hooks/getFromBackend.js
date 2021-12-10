import { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore"; 
import { db } from "../firebase-config";

const GetFromBackend = (coll) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const q = query(collection(db, coll));
        const unsub = onSnapshot(q, (querySnapshot) => {
            const documents = [];
            querySnapshot.forEach((doc) => {
                documents.push({...doc.data(), id: doc.id});
            });
            setDocs(documents);
        })
        return () => unsub();
    }, [coll])

    return { docs };
}

export default GetFromBackend;