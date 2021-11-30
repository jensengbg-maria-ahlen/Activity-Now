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
    const [title, setTitle] = useState("")
    const [topic, setTopic] = useState("")
    const [time, setTime] = useState("")
    const [location, setLocation] = useState("")
    const [date, setDate] = useState("")
    const [description, setDesc] = useState("")
    const [join, setJoin] = useState(false)

    const handleCancel = async () => {
        const docRef = doc(db, "activities", id)
        await deleteDoc(docRef)
        history.goBack
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

    useEffect(() => {
        const obj = [...docs].find((obj) => { return obj.id === id })
        setActivity(obj)

        if (activity) {
            setTitle(activity.title)
            setTopic(activity.topic)
            setLocation(activity.location)
            setDesc(activity.description)
            setDate(activity.startDate)
            setTime(activity.time)

            const isJoined = activity.join.find((obj) => { return obj === currentUser.uid })
            if (isJoined) {
                setJoin(true)
            }
        }

        
        
    }, [activity, docs, id])

    return (
        <React.Fragment >
            {activity ? (
                <div className="activity">
                    <div className="activity__content">
                        <h2 className="title title--h2">
                            <span className="title--bold"> {title}</span>
                        </h2>
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
                        </form>
                        <div className="activity__buttons">
                            <button className="edit-btn" onClick={history.goBack}>Go back</button>
                            {activity.creator === currentUser.uid ? (
                                <div className="activity__buttons--handle">
                                    <ConfirmDeletion setConfirmed={handleCancel} />                                  
                                    <button className="edit-btn">Edit activity</button>
                                </div>
                            ): (
                                <div className="activity__buttons--join">
                                    <button disabled={!join} className="edit-btn" onClick={handleUnregister}>Can't go</button>
                                    <button disabled={join} className="edit-btn" onClick={handleJoin}>Join</button>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            ) : null}
        </React.Fragment>
    )
}

export default ChosenActivity