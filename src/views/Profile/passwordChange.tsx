// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import "./_password.scss";

const PasswordChange: React.FC = () => {
    const history = useHistory();
    const auth = getAuth();
    const user = auth.currentUser;
    const [saved, setSaved] = useState(false)
    const [errors, setErrors] = useState([]);
    const [disabled, setDisabled] = useState(true);
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmedPassword] = useState("")

    const saveNewPassword = () => {
        try {
            const credentials = EmailAuthProvider.credential(user.email, currentPassword);
            reauthenticateWithCredential(user, credentials).then(() => {
                if (newPassword !== confirmPassword) {
                    let validationErrors = [];
                    validationErrors.push("password-no-match");
                    setErrors(validationErrors);
                } else {
                    updatePassword(user, newPassword).then(() => {
                        setDisabled(true)
                        setSaved(true);
                    }).catch((error) => {
                        let validationErrors = [];
                        validationErrors.push("password-is-weak");
                        setErrors(validationErrors);
                        return error
                    });
                }
            }).catch((error) => {
                let validationErrors = [];
                validationErrors.push("password-not-valid");
                setErrors(validationErrors);
                return error;
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (currentPassword.length >= 6 && newPassword.length >= 1 && confirmPassword.length >= 1) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [currentPassword, newPassword, confirmPassword])

    return (
        <div className="password">
            <div className="password__content">
                <div className="password__header">
                    <h1 className="title title--h1 title--bold">Change password</h1>
                </div>
                {saved ? (
                    <div className="password__saved">
                        <h2 className="title title--h2 title--bold">Password updated!</h2>
                    </div>
                ) : null}
                <form className="password__form">
                    <div className="password__input-form">
                        <label className="caption caption--bold">
                            Current password:
                            <input
                                style={{
                                    border: errors.includes("password-not-valid") ?
                                        "2px solid #BB0101" : "1px solid black"
                                }}
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="password__input-form">
                        <label className="caption caption--bold">
                            New password:
                            <input
                                style={{
                                    border: errors.includes("password-no-match" && "password-is-weak") ?
                                        "2px solid #BB0101" : "1px solid black"
                                }}
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="password__input-form">
                        <label className="caption caption--bold">
                            Confirm password:
                            <input
                                style={{
                                    border: errors.includes("password-no-match" && "password-is-weak") ?
                                        "2px solid #BB0101" : "1px solid black"
                                }}
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmedPassword(e.target.value)}
                            />
                        </label>
                        {errors.includes("password-not-valid") ? (
                            <p className="paragraph paragraph--small paragraph--bold paragraph--no-spacing">Current password is not valid</p>
                        ) : null}
                        {errors.includes("password-no-match") ? (
                            <p className="paragraph paragraph--small paragraph--bold paragraph--no-spacing">Passwords does not match</p>
                        ) : null}
                        {errors.includes("password-is-weak") ? (
                            <p className="paragraph paragraph--small paragraph--bold paragraph--no-spacing">Password should be at least 6 characters</p>
                        ) : null}
                    </div>
                    <Link className="link" to="/forgotpassword">
                        <p className="caption caption--bold">Forgot Password</p>
                    </Link>
                </form>
                <div>
                </div>
                <div className="password__buttons">
                    <button onClick={history.goBack}>Go Back</button>
                    <button disabled={disabled} className="save-btn" onClick={() => saveNewPassword()}>Save</button>
                </div>
            </div>


        </div>
    )
}

export default PasswordChange