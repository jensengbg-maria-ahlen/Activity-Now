// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
    deleteUser,
    getAuth,
    reauthenticateWithCredential,
    updateProfile,
    updateEmail,
    updatePassword
} from "firebase/auth";
import { collection, addDoc, doc, updateDoc, arrayUnion } from "@firebase/firestore";
import GetFromBackend from "../../hooks/getFromBackend";
import { logout, db } from '../../firebase-config'
import { MdDone } from "react-icons/md";
import ConfirmDeletetion from "../../Components/HandleConfirm/confirmDeletetion";
import userImg from '../../assets/user.png';
import ProgressBar from "../../Components/Progress/progressBar"
import './_profile.scss';
import "../../Styles/_buttons.scss";

const Profile: React.FC = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const { docs } = GetFromBackend("topics");
    const [error, setError] = useState("")
    const [file, setfile] = useState(null)
    const [currentImg, setCurrentImg] = useState(userImg)
    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("*******")
    const [yourTopics, setYourTopics] = useState([])
    const [chosenTopic, setChosenTopic] = useState("")
    const [allTopics, setAllTopics] = useState([])
    const [saved, setSaved] = useState(true)


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

    const addTopicsToUser = (value) => {
        if (!yourTopics.includes(value)) {
            const newArr = [...yourTopics, value];
            setYourTopics(newArr);
            setChosenTopic(value);
        }
    }

    const handleSaveProfile = async () => {
        const topic = docs.find((obj) => obj.topic === chosenTopic)
        const topicRef = doc(db, "topics", topic.id)
        await updateDoc(topicRef, {
            following: arrayUnion({userid: user.uid})
        })
        updateProfile(user, {
            displayName: displayName,
            photoURL: currentImg
        }).then(() => {
            setSaved(true)
        }).catch((err) => {
            console.log(err)
        })

        updateEmail(user, email).then(() => {
            setSaved(true)
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleRemoveAccount = async () => {
        deleteUser(user).then(() => {
            console.log("user deleted")
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        if (docs) {
            const topics = docs.map((obj) => {return obj.topic})
            setAllTopics(topics)            
        }

        if (allTopics) {
            const topics = docs.filter((obj) => obj.following.some((ob) => ob.userid === user?.uid))
            const value = topics.map((obj) => {return obj.topic})
            setYourTopics(value);
        }

        if (user) {
            setEmail(user.email);
            if (user.photoURL) {
                setCurrentImg(user.photoURL);
            }
            if (user.displayName) {
                setDisplayName(user.displayName);
            }
        }
    }, [user, docs])

    return (
        <div className="profile">
            <div className="profile__content">
                {user.displayName ? (
                    <div className="profile__welcome">
                        <h2 className="title title--h2">Welcome new user</h2>
                        <p className="paragraph paragraph--bold">Please set a username before continuing</p>
                    </div>
                ) : null}
                {saved ? (
                    <div className="profile__saved">
                        <h2 className="title title--h2 title--bold">Profile saved! <MdDone /></h2>
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
                        <p className="caption caption--bold">Your topics:</p>
                        <p className="paragraph paragraph--bold paragraph--small">
                        {yourTopics?.map((topic) => (
                            <span key={topic}>{topic}, </span>
                        ))}
                        </p>
                    </div>
                    <label className="profile__form--item">
                        <p className="caption caption--bold">Add new topic: </p>
                        <select name="topics" onChange={(e) => addTopicsToUser(e.target.value)}>
                            <option value="empty"></option>
                            {allTopics?.map((topic) => (
                                <option value={topic} key={topic}>{topic}</option>
                            ))}
                        </select>
                    </label>
                </form>
                <div className="profile__buttons">
                    <ConfirmDeletetion setConfirmed={handleRemoveAccount} />
                    <button className="login-btn" onClick={logout}>Sign out</button>
                    <button className="create-btn" onClick={handleSaveProfile}>Save profile</button>
                </div>
            </div>
        </div>
    );
}
export default Profile;