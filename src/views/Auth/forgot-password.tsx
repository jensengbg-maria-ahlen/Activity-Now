// @ts-nocheck
import React, { useState } from "react"
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../firebase-config'
import ToggleInfo from "../../Components/ToggleInfo/toggleInfo";
import './_auth.scss';

const ForgotPassword: React.FC = () => {
    const [errors, setErrors] = useState([]);
    const [loginEmail, setLoginEmail] = useState('');
    const [disabled, setDisabled] = useState(true);

    const forgotPass = async () => {
        const valid = validateEmail(loginEmail);

        if (valid) {
            setDisabled(false);
            try {
                const sendMail = await sendPasswordResetEmail(auth, loginEmail)
                console.log(sendMail)
            } catch (error) {
                if (error.code === "auth/user-not-found") {
                    let validationErrors = [];
                    validationErrors.push("email-not-found");
                    setErrors(validationErrors);
                }
            }
        } else {
            let validationErrors = [];
            validationErrors.push("email-not-valid");
            setErrors(validationErrors);
        }
    }

    const validateEmail = (email) => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regex.test(email)) {
            return true;
        }
        return false;
    }

    return (
        <React.Fragment>
            <article className="login-view">
                <div className="login-view__header">
                    <h1 className="title title--h1 title--bold">Forgot password</h1>
                    <Link className="link" to="/">
                        <p className="paragraph paragraph--small paragraph--bold paragraph--no-spacing">Login</p>
                    </Link>
                </div>
                <div className="login-view__form-div">
                    <form className="login-view__form">
                        <div className="login-view__input-form">
                            <label className="caption caption--bold">
                                Email
                                <input
                                    style={{
                                        border: errors.includes("email-not-valid") ?
                                            "2px solid #BB0101" : "1px solid black"
                                    }}
                                    type="email"
                                    onChange={(e) => {
                                        setLoginEmail(e.target.value)

                                        let validationErrors: string[] = [...errors].filter(
                                            (error) => error !== "email-not-valid"
                                        )
                                        if (!validateEmail(e.target.value) && validationErrors.indexOf("email-not-valid") === -1) {
                                            validationErrors.push("email-not-valid");
                                            setDisabled(true);
                                        } else {
                                            validationErrors === validationErrors.filter((error) => error !== "email-not-valid")
                                            setDisabled(false);
                                        }
                                        setErrors(validationErrors);
                                    }}
                                />
                            </label>

                            {errors.includes("email-not-valid") ? (
                                <p className="paragraph paragraph--small paragraph--bold paragraph--no-spacing">Not a valid email</p>
                            ) : null}
                            {errors.includes("email-not-found") ? (
                                <p className="paragraph paragraph--small paragraph--bold paragraph--no-spacing">Email does not exist</p>
                            ) : null}
                        </div>
                    </form>
                </div>
                <div className="login-view__buttons">
                    <button disabled={disabled} className="forgot-btn" onClick={forgotPass}>Reset password</button>
                </div>
            </article>
            <ToggleInfo toggleText="Check your trash folder if no email has been received." />
        </React.Fragment>
    )
}

export default ForgotPassword;
