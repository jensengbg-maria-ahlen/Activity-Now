// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
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
    const history = useHistory();
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
    const [newTopic, setNewTopic] = useState("");
    const itemExist = docs.find((doc) => doc.uid === uid);


    const handleUploadPicture = (e) => {
        const types = ["image/png", "image/jpeg", "image/jpg"];
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
            const payload = {
                file: {
                    name: file.name,
                    url: currentImg
                },
                displayName: displayName
            };
            try {
                const collRef = await setDoc(docRef, payload);
                if (collRef) {
                    history.push("/")
                }
            } catch (error) {
                console.log(error)
            }
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
            try {
                const docRef = await addDoc(collectionRef, payload);
                if (docRef) {
                    history.push("/")
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        if (currentUser) {
            setUid(currentUser.uid);
            setEmail(currentUser.email);
            if (currentUser.photoURL) {
                setCurrentImg(currentUser.photoURL);
            }
            if (currentUser.displayName) {
                setDisplayName(currentUser.displayName);
            }
        }
        if (itemExist) {
            if (itemExist.displayName) {
                setDisplayName(itemExist.displayName)
            }
            if (itemExist.file) {
                setCurrentImg(itemExist.file.url)
            }
        }
    }, [currentUser, itemExist])

    return (
        <div className="profile">
            <div className="profile__content">
                {!itemExist && !currentUser.displayName ? (
                    <div className="profile__welcome">
                        <h2 className="title title--h2">Welcome new user</h2>
                        <p className="paragraph paragraph--bold">Please set a username before continuing</p>
                    </div>
                ) : null}
                <article className="profile__photo-settings">
                    {file ? (<ProgressBar file={file} setCurrentImg={setCurrentImg} />) : null}
                    {error && <p className="paragraph paragraph--bold">{error}</p>}
                    <img src={currentImg} alt="user" className="profile__image" />
                    <label className="profile__pick-image">
                        <p className="paragraph paragraph--bold paragraph--small paragraph--no-spacing">Upload picture</p>
                        <input type="file" onChange={handleUploadPicture} />
                    </label>
                </article>
                <form className="profile__form">
                    <label className="profile__form--item">
                        <p className="caption caption--bold">Username:</p>
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                    </label>
                    <label className="profile__form--item">
                        <p className="caption caption--bold">Email:</p>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label className="profile__form--item">
                        <p className="caption caption--bold">Change password:</p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <div className="profile__form--item">
                        <p className="caption caption--bold">Your upcoming activities:</p>
                        <div>{activities}</div>
                    </div>
                    <div className="profile__form--item">
                        <p className="caption caption--bold">Your topics:</p>
                        <div>{topics}</div>
                    </div>
                    <label className="profile__form--item">
                        <p className="caption caption--bold">Add new topic: </p>
                        <input
                            type="text"
                            value={newTopic}
                            onChange={(e) => setNewTopic(e.target.value)}
                        />
                    </label>
                </form>
                <div className="profile__buttons">
                    <button className="login-btn" onClick={logout}>Sign out</button>
                    <button className="create-btn" onClick={handleSubmit}>Save profile</button>
                </div>
            </div>
        </div>
    );
}
export default Profile;