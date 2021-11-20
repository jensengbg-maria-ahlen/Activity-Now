// @ts-nocheck
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import info from '../assets/info.png';
import googleImg from '../assets/google.png';
import facebookImg from '../assets/facebook.png';
import '../Styles/_login-view.scss';
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from '../firebase-config'

const SignupView: React.FC = () => {
    const [isShown, setIsShown] = useState(false);
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    };

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
                    <h1 className="title title--h1 title--bold">Signup</h1>
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
                                    setRegisterEmail(e.target.value)
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
                        <div className="login-view__input-form">
                            <p className="caption">Password</p>
                            <input
                                type="password"
                                onChange={(event) => {
                                    setRegisterPassword(event.target.value)
                                }} />
                        </div>
                    </form>
                </div>
                <div className="login-view__buttons">
                    <button className="google-btn">
                        <img src={googleImg} alt="google" />
                    </button>
                    <button className="facebook-btn" >
                        <img src={facebookImg} alt="facebook" />
                    </button>
                    <button className="create-btn" onClick={register}> Create User</button>
                </div>
            </article>
            <div className="toggle-info"
                onClick={() => setIsShown(!isShown)}
            >
                <img className="toggle-info__info-img" src={info} alt="info" />
                {isShown && (
                    <div className="toggle-info__info-text">
                        <p className=".caption caption--bold">
                            info about activity today, stuff you agree too when signing up
                        </p>
                    </div>

                )}
            </div>
        </React.Fragment>

    );
}
export default SignupView;