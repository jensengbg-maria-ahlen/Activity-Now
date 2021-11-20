// @ts-nocheck
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import googleImg from '../assets/google.png';
import facebookImg from '../assets/facebook.png';
import '../Styles/_login-view.scss';
import { signInWithGoogle, signInWithFacebook } from "../firebase-config"
import {
    signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from '../firebase-config'

const LoginView = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPwd, setLoginPassword] = useState('')
    const [errors, setErrors] = useState([]);


    const loginWithCredentials = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPwd)
            console.log(user)
        } catch (error) {
            console.log(error)
        }
    }

    let onLoginClicked = async (formEvent: React.FormEvent) => {
        setErrorMessage(" ")
        formEvent.preventDefault();
        setErrorMessage('User does not exist');
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
                    <h1 className="title title--h1 title--bold">Login</h1>
                    <Link className="link" to="/signup">
                        <p className="paragraph paragraph--small paragraph--bold paragraph--no-spacing">Sign up</p>
                    </Link>
                </div>
                <div className="login-view__form-div">
                    {errorMessage ?
                        <p className="paragraph paragraph--bold paragraph--error">{errorMessage}</p>
                        : null
                    }
                    <form className="login-view__form" onSubmit={(e) => onLoginClicked(e)}>
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
                        <div className="login-view__input-form">
                            <p className="caption">Password</p>
                            <input type="password" onChange={(event) => {
                                setLoginPassword(event.target.value);
                            }} ></input>
                        </div>
                        <p className="caption caption--bold">Forgot password</p>
                    </form>
                </div>
                <div className="login-view__buttons">
                    <button className="google-btn" onClick={signInWithGoogle}>
                        <img src={googleImg} alt="google" />
                    </button>
                    <button className="facebook-btn" onClick={signInWithFacebook}>
                        <img src={facebookImg} alt="facebook" />
                    </button>
                    <button className="login-btn" onClick={loginWithCredentials} type="submit">Login</button>
                </div>
            </article>
            
        </React.Fragment>
    );
}
export default LoginView;