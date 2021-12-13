// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { updateDoc, doc, deleteDoc, arrayUnion, arrayRemove } from "@firebase/firestore";
import GetFromBackend from "../../hooks/getFromBackend";
import { useAuth } from '../../hooks/authentication'
import { db } from "../../firebase-config";
import ConfirmDeletion from "../HandleConfirm/confirmDeletetion";
import "./_activity.scss";
import "../../Styles/_buttons.scss";

const ChosenActivity: React.FC = () => {
    const history = useHistory()
    let { id } = useParams()
    const currentUser = useAuth()
    const { docs } = GetFromBackend("activities")
    const [activity, setActivity] = useState(null)
    const [going, setGoing] = useState(0)
    const [title, setTitle] = useState("")
    const [topic, setTopic] = useState("")
    const [time, setTime] = useState("")
    const [location, setLocation] = useState("")
    const [date, setDate] = useState("")
    const [description, setDesc] = useState("")
    const [join, setJoin] = useState(false)
    const [isToday, setIsToday] = useState(false);

    const handleCancel = async () => {
        const docRef = doc(db, "activities", id)
        await deleteDoc(docRef)
        history.goBack()
    }

    const handleJoin = async () => {
        const docRef = doc(db, "activities", id)
        await updateDoc(docRef, {
            join: arrayUnion(currentUser.uid)
        })
        setJoin(true)
    }

    const handleUnregister = async () => {
        const docRef = doc(db, "activities", id)
        await updateDoc(docRef, {
            join: arrayRemove(currentUser.uid)
        })
        setJoin(false)
    }

    const goTo = () => {
        history.push(`/edit/${activity.id}`)
    }

    useEffect(() => {
        const obj = [...docs].find((obj) => { return obj.id === id })
        setActivity(obj)
        if (obj) {
            const numberGoing = obj.join.length;
            setGoing(numberGoing)
        }
        if (activity) {
            setTitle(activity.title)
            setTopic(activity.topic)
            setLocation(activity.location)
            setDesc(activity.description)
            setDate(activity.start)
            setTime(activity.time)

            const isJoined = activity.join.find((obj) => { return obj === currentUser.uid })
            if (isJoined) {
                setJoin(true)
            }
        }
        const today = new Date();

        if (today.toISOString().split('T')[0] >= date) {
            setIsToday(false)
        } else {
            setIsToday(true)
        }
    }, [activity, docs, id, going, currentUser, date])

    return (
        <React.Fragment >
            {activity ? (
                <div className="activity">
                    <div className="activity__content">
                        <h2 className="title title--h2">
                            <span className="title--bold"> {title}</span>
                        </h2>
                        {activity.creator === "Anonymus" ? (
                            <h3 className="title title--h3 title--bold">The creator for this activity has chosen to end their account. <br></br> If you still want to attend, please feel free to do so.</h3>
                        ) : null }
                        <form className="activity__form">
                            <div className="activity__form--item">
                                <p className="paragraph paragraph--bold">Name:</p>
                                <p className="paragraph paragraph--small">{title}</p>
                            </div>
                            <div className="activity__form--item">
                                <p className="paragraph paragraph--bold">Date:</p>
                                <p className="paragraph paragraph--small">{date}</p>
                            </div>
                            <div className="activity__form--item">
                                <p className="paragraph paragraph--bold">Time:</p>
                                <p className="paragraph paragraph--small">{time}</p>
                            </div>
                            <div className="activity__form--item">
                                <p className="paragraph paragraph--bold">Location:</p>
                                <p className="paragraph paragraph--small">{location}</p>
                            </div>
                            <div className="activity__form--item">
                                <p className="paragraph paragraph--bold">Topic:</p>
                                <p className="paragraph paragraph--small">{topic}</p>
                            </div>
                            <div className="activity__form--item">
                                <p className="paragraph paragraph--bold">Description:</p>
                                <p className="paragraph paragraph--small">{description}</p>
                            </div>
                            <div className="activity__form--item">
                                <p className="paragraph paragraph--bold">Number of people who is going: {going}</p>

                            </div>

                        </form>
                        <div className="activity__buttons">
                            <button className="edit-btn" onClick={history.goBack}>Go back</button>
                            {isToday ? (
                                <React.Fragment>
                                    {activity.creator === currentUser.uid ? (
                                        <div className="activity__buttons--handle">
                                            <ConfirmDeletion setConfirmed={handleCancel} />
                                            <button className="edit-btn" onClick={goTo} >Edit activity</button>
                                        </div>
                                    ) : (
                                        <div className="activity__buttons--join">
                                            <button disabled={!join} className="edit-btn" onClick={handleUnregister}>Can't go</button>
                                            <button disabled={join} className="edit-btn" onClick={handleJoin}>Join</button>
                                        </div>
                                    )}
                                </React.Fragment>
                            ) : null}


                        </div>
                    </div>
                </div>
            ) : null}
        </React.Fragment>
    )
}

export default ChosenActivity