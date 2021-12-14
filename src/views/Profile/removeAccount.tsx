// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { deleteUser, EmailAuthProvider, getAuth, reauthenticateWithCredential } from "firebase/auth";
import { doc, updateDoc, collection, query, onSnapshot } from "@firebase/firestore";
import { db } from "../../firebase-config";
import ConfirmDeletetion from "../../Components/HandleConfirm/confirmDeletetion";
import "./_password.scss";

const RemoveAccount: React.FC = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const history = useHistory()
    const [password, setPassword] = useState<string>("")
    const [errors, setErrors] = useState<string[]>([]);
    const [disabled, setDisabled] = useState<boolean>(true);
    const [allActivities, setAllActivities] = useState([])
    const credentials = EmailAuthProvider.credential(user.email as string, password);

    const handleRemoveAccount = async () => {
        try {
            reauthenticateWithCredential(user, credentials).then(() => {
                deleteUser(user).then(() => {
                    const creator = allActivities.filter((obj) => obj.creator === user?.uid);
                    creator.map(async (obj) => {
                        const oldTopicRef = doc(db, "activities", obj.id)
                        await updateDoc(oldTopicRef, {
                            creator: "Anonymus"
                        })
                    });
                }).catch((error) => {
                    return error
                })
            }).catch((error) => {
                let validationErrors = [];
                validationErrors.push("password-not-valid");
                setErrors(validationErrors);
                return (error)
            });
        } catch (error) {
            return error
        }
    }

    const activities = () => {
        const q = query(collection(db, "activities"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            const documents = [];
            querySnapshot.forEach((doc) => {
                documents.push({ ...doc.data(), id: doc.id });
            });
            setAllActivities(documents)
        })

        return () => unsub();
    }


    useEffect(() => {
        if (password.length >= 6) {
            setDisabled(false)
        }

        activities()
    }, [disabled, password, user])

    return (
        <div className="password">
            <div className="password__content">
                <div className="password__header">
                    <h1 className="title title--h1 title--bold">Remove Account</h1>
                </div>
                <form className="password__form">
                    <div className="password__input-form">
                        <label className="caption caption--bold">
                            Password:
                            <input
                                style={{
                                    border: errors.includes("password-not-valid") ?
                                        "2px solid #BB0101" : "1px solid black"
                                }}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        {errors.includes("password-not-valid") ? (
                            <p className="paragraph paragraph--small paragraph--bold paragraph--no-spacing">Password is incorrect!</p>
                        ) : null}
                    </div>
                </form>
                <div className="password__buttons">
                    <button onClick={() => history.goBack()}>Go back</button>
                    <ConfirmDeletetion setConfirmed={() => handleRemoveAccount()} disabled={disabled} confirmText="Are you sure you want to remove your account?" />
                </div>
            </div>
        </div>
    )
}

export default RemoveAccount