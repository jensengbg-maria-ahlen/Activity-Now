// @ts-nocheck
import React, { useEffect, useState } from "react";
import { setDoc, doc, collection, addDoc } from "@firebase/firestore";
import { useAuth } from '../../hooks/authentication'
import GetFromBackend from "../../hooks/getFromBackend";
import { logout, db } from '../../firebase-config'
import userImg from '../../assets/user.png';
import ProgressBar from "../../Components/Progress/progressBar"
import './_profile.scss';
import "../../Styles/_buttons.scss";

const Profile: React.FC = () => {
    const currentUser = useAuth();
    const { docs } = GetFromBackend("profiles");
    const [error, setError] = useState("")
    const [uid, setUid] = useState("")
    const [file, setfile] = useState(null)
    const [currentImg, setCurrentImg] = useState(userImg)
    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("*******");
    const [activities, setActivities] = useState([]);
    const [topics, setTopics] = useState([]);
    const [newTopic, setNewTopic] = useState();
    const itemExist = docs.find((doc) => doc.uid === uid);
    

    const handleUploadPicture = (e) => {
        const types = ["image/png", "image/jpeg"];
        let selectedImg = e.target.files[0]
        if (selectedImg && types.includes(selectedImg.type)) {
            setfile(selectedImg)
            setError("")
        } else {
            setfile(null);
            setError("Please select an image file (png or jpeg)");
        }
    }

    const handleSubmit = async () => {
        if (itemExist) {
            const docRef = doc(db, "profiles", uid)
            console.log(file);
            const payload = { 
                file: {
                    name: file.name,
                    url: currentImg
                }, 
                displayName: displayName
            };
            console.log("docRef körs", payload);
            // const collRef = await setDoc(docRef, payload);
            //return collRef;
        } else {
            const collectionRef = collection(db, "profiles")
            const payload = { 
                file: {
                    name: file.name,
                    url: currentImg
                }, 
                displayName: displayName, 
                uid: uid,
            };
            console.log("collectionRef körs", payload);
            const docRef = await addDoc(collectionRef, payload);
            return docRef;
        }
    }

    useEffect(() => {
        if (currentUser) {
            setUid(currentUser.uid);
            setEmail(currentUser.email);
            if (currentUser.photoURL || currentUser.displayName) {
                setCurrentImg(currentUser.photoURL);
                setDisplayName(currentUser.displayName);
            }
        }
        if (itemExist.uid) {
            if (itemExist.displayName || itemExist.file) {
                setDisplayName(itemExist.displayName)
                setCurrentImg(itemExist.file.url)
            }
        }
    }, [currentUser, itemExist])

    return (
        <div className="profile">
            {!itemExist && !currentUser.displayName ? (
                <div className="profile__welcome">
                    <h2 className="title title--h2">Welcome new user</h2>
                    <p className="paragraph paragraph--bold">Please set a username before continue</p>
                </div>
            ) : null}
            <article className="profile__photo-settings">
                <img src={currentImg} alt="user image" className="profile__image" />
                {file ? ( <ProgressBar file={file} setCurrentImg={setCurrentImg} /> ) : null }                
                <label className="profile__pick-image">
                    <p className="paragraph paragraph--no-spacing">Upload picture</p>
                    <input type="file" onChange={handleUploadPicture} />
                </label>
            </article>
            <section className="profileSect">
                <label>
                    <p>Username: {displayName}</p>
                    <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                </label>
                <label>
                    <p>Email: {email}</p>
                    <input type="email" />
                </label>
                <p>Change password: {password}</p>
                <p>Your upcoming activities: {activities}</p>
                <p>Your topics: {topics}</p>
                <p>Add new topic: </p>
            </section>
            <div>
                <button className="login-btn" onClick={logout}>Sign out</button>
                <button className="create-btn" onClick={handleSubmit}>Save profile</button>                
            </div>
            
        </div>
    );
}
export default Profile;