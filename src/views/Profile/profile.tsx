// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { doc, updateDoc, arrayUnion, arrayRemove } from "@firebase/firestore";
import GetFromBackend from "../../hooks/getFromBackend";
import { logout, db } from '../../firebase-config'
import { MdDone } from "react-icons/md";
import userImg from '../../assets/user.png';
import ProgressBar from "../../Components/Progress/progressBar"
import './_profile.scss';
import "../../Styles/_buttons.scss";

const Profile: React.FC = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const history = useHistory()
    const { docs } = GetFromBackend("topics");
    const [error, setError] = useState("")
    const [file, setfile] = useState(null)
    const [currentImg, setCurrentImg] = useState(userImg)
    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [yourTopics, setYourTopics] = useState([])
    const [chosenTopic, setChosenTopic] = useState("")
    const [allTopics, setAllTopics] = useState([])
    const [saved, setSaved] = useState(false)
    const [canChangePass, setCanChangePass] = useState(false);

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
        const item = allTopics.find((obj) => obj.id === value);
        if (!yourTopics.includes(item)) {
            const newArr = [...yourTopics, item];
            setYourTopics(newArr);
            setChosenTopic(item.topic);
        }
    }

    const removeTopic = async (topic) => {
        const topicReff = doc(db, "topics", topic.id)
        await updateDoc(topicReff, { following: arrayRemove({ userid: user.uid }) })
    }

    const handleSaveProfile = async () => {
        if (chosenTopic) {
            const topic = docs.find((obj) => obj.topic === chosenTopic)
            const topicRef = doc(db, "topics", topic.id)
            await updateDoc(topicRef, {
                following: arrayUnion({ userid: user.uid })
            })
        }
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

    useEffect(() => {
        if (docs) {
            setAllTopics(docs)
        }

        if (allTopics) {
            const topics = docs.filter((obj) => obj.following.some((ob) => ob.userid === user?.uid))
            setYourTopics(topics);
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

        const provider = user?.providerData.map((id) => id.providerId)
        if (provider[0] === "password") {
            setCanChangePass(true)
        }
    }, [user, docs, allTopics])

    return (
        <div className="profile">
            <div className="profile__content">
                {!user.displayName ? (
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
                    <div className="profile__form--item">
                        <p className="caption caption--bold">Your topics:</p>
                        <div className="topic-container">
                            {yourTopics?.map((topic) => (
                                <article className="topicDiv" key={topic.id}>
                                    <p className="caption caption--bold caption--no-spacing">{topic.topic} </p>
                                    <div className="topicRemove">
                                        <span className="caption caption--bold caption--no-spacing" onClick={() => removeTopic(topic)}> X </span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                    <label className="profile__form--item">
                        <p className="caption caption--bold">Add new topic: </p>
                        <select name="topics" onChange={(e) => addTopicsToUser(e.target.value)}>
                            <option value="empty"></option>
                            {allTopics?.map((topic) => (
                                <option value={topic.id} key={topic.id}>{topic.topic}</option>
                            ))}
                        </select>
                    </label>
                    {canChangePass ? (
                        <Link to="/profile/changepassword">
                            <p className="paragraph paragraph--bold paragraph--no-spacing">Change password</p>
                        </Link>
                    ) : null}
                </form>
                <div className="profile__buttons">
                    <button className="delete-btn" onClick={() => history.push("/removeaccount")}>Delete me</button>
                    <button className="login-btn" onClick={logout}>Sign out</button>
                    <button className="create-btn" onClick={handleSaveProfile}>Save profile</button>
                </div>
            </div>
        </div>
    );
}
export default Profile;