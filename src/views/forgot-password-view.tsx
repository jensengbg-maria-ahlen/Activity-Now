// @ts-nocheck
import React, { useState } from "react"
import { Link } from "react-router-dom";
import {
    sendPasswordResetEmail
} from "firebase/auth";
import { auth } from '../firebase-config'

import infoImg from '../assets/info.png';

import '../Styles/_login-view.scss';
import "../Styles/_toggle-info.scss";


const ForgotPasswordPage = () => {
    const [isShown, setIsShown] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loginEmail, setLoginEmail] = useState('')

    const forgotPass = async () => {
        const sendMail = await sendPasswordResetEmail(auth, loginEmail)
        console.log(sendMail)
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
                            <p className="caption">Email</p>
                            <input
                                type="email"
                                onChange={(e) => {
                                    setLoginEmail(e.target.value)
                                }} 
                                onBlur={(e) => {
                                    let validationErrors: string[] = [...errors].filter(
                                        (error) => error !== "email-error"
                                    )
                                    if (!validateEmail(e.target.value) && validationErrors.indexOf("email-error") === -1) {
                                        validationErrors.push("email-error");
                                    } else {
                                        validationErrors === validationErrors.filter((error) => error !== "email-error")
                                    }
                                    setErrors(validationErrors);
                                }}
                            />
                            {errors.includes("email-error") ? (
                                <span>Not a valid email</span>
                            ) : null}
                        </div>
                    </form>
                </div>
                <div className="login-view__buttons">
                    <button className="forgot-btn" onClick={forgotPass}>Reset password</button>
                </div>
            </article>

            <div className="toggle-info"
                onClick={() => setIsShown(!isShown)}
            >
                <img className="toggle-info__info-img" src={infoImg} alt="info" />
                {isShown && (
                    <div className="toggle-info__info-text">
                        <p className=".caption caption--bold">
                            info about activity today, stuff you agree too when signing up
                        </p>
                    </div>
                )}
            </div>
        </React.Fragment>
    )
}

export default ForgotPasswordPage;
