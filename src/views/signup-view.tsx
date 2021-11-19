// @ts-nocheck
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, signInWithGoogle, signInWithFacebook } from '../firebase-config'

import googleImg from '../assets/google.png';
import facebookImg from '../assets/facebook.png';

import ToggleInfo from "../Components/toggleInfo";
import '../Styles/_login-view.scss';

const SignupView: React.FC = () => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [disabled, setDisabled] = useState(true);

    const validateEmail = (email) => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regex.test(email)) {
            return true;
        }
        return false;
    }

    const register = async () => {
        const valid = validateEmail(registerEmail);

        if (!valid) {
            let validationErrors = [];
            validationErrors.push("email-not-valid");
            setErrors(validationErrors);
        }
        if (password !== registerPassword) {
            let validationErrors = [];
            validationErrors.push("password-no-match");
            setErrors(validationErrors);
        }
        if (valid && password === registerPassword) {
            try {
                const user = await createUserWithEmailAndPassword(
                    auth,
                    registerEmail,
                    registerPassword
                );
                console.log(user);
            } catch (error) {
                console.log(error.message);
                if (error.message === "auth/weak-password") {
                    let validationErrors = [];
                    validationErrors.push("password-is-weak");
                    setErrors(validationErrors);
                }
            }
        }
    };

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
                            <label className="caption caption--bold">
                                Email
                                <input
                                    style={{
                                        border: errors.includes("email-not-valid") ?
                                            "2px solid #BB0101" : "1px solid black"
                                    }}
                                    type="email"
                                    onChange={(e) => {
                                        setRegisterEmail(e.target.value)

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
                        </div>
                        
                        <div className="login-view__input-form">
                            <label className="caption caption--bold">
                                Password
                                <input
                                    style={{
                                        border: errors.includes("password-no-match" && "password-is-weak") ?
                                            "2px solid #BB0101" : "1px solid black"
                                    }}
                                    type="password"
                                    onChange={(event) => {
                                        setPassword(event.target.value)
                                    }}
                                />
                            </label>
                        </div>

                        <div className="login-view__input-form">
                            <label className="caption caption--bold">
                                Confirm password
                                <input
                                    style={{
                                        border: errors.includes("password-no-match" && "password-is-weak") ?
                                            "2px solid #BB0101" : "1px solid black"
                                    }}
                                    type="password"
                                    onChange={(event) => {
                                        setRegisterPassword(event.target.value)
                                    }}
                                />
                            </label>

                            {errors.includes("password-no-match") ? (
                                <p className="paragraph paragraph--small paragraph--bold paragraph--no-spacing">Passwords does not match</p>
                            ) : null}
                            {errors.includes("password-is-weak") ? (
                                <p className="paragraph paragraph--small paragraph--bold paragraph--no-spacing">Password should be at least 6 characters</p>
                            ) : null}
                        </div>
                    </form>
                </div>

                <div className="login-view__buttons">
                    <button className="google-btn" onClick={signInWithGoogle}>
                        <img src={googleImg} alt="google" />
                    </button>
                    <button className="facebook-btn" onClick={signInWithFacebook}>
                        <img src={facebookImg} alt="facebook" />
                    </button>
                    <button disabled={disabled} className="create-btn" onClick={register}> Create User</button>
                </div>
            </article>
            <ToggleInfo toggleText="info about activity today, stuff you agree too when signing up" />
        </React.Fragment>
    );
}
export default SignupView;