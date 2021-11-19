// @ts-nocheck
import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
    signInWithPopup,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider
} from "firebase/auth";
import { auth } from '../firebase-config'

import googleImg from '../assets/google.png';
import facebookImg from '../assets/facebook.png';

import ToggleInfo from "../Components/toggleInfo";
import '../Styles/_login-view.scss';


const LoginView = () => {
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPwd, setLoginPassword] = useState('')
    const [errors, setErrors] = useState([]);
    const [disabled, setDisabled] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();

    const loginWithCredentials = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPwd)
            console.log(user)
        } catch (error) {
            console.log(error.message)
            if(error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
                let validationErrors = [];
                validationErrors.push("password-no-match");
                setErrors(validationErrors);
            }
        }
    }

    const loginWithGoogle = () => {
        signInWithPopup(auth, googleProvider).then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            const user = result.user;

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;

            // The email of the user's account used.
            const email = error.email;

            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
        })
    }

    const loginWithFacebook = () => {
        signInWithPopup(auth, facebookProvider).then((result) => {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;

            // The signed-in user info.
            const user = result.user;

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;

            // The email of the user's account used.
            const email = error.email;

            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);
        })
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
                    <form className="login-view__form">
                        <div className="login-view__input-form">
                            <p className="caption">Email</p>
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
                            {errors.includes("email-not-valid") ? (
                                <p className="paragraph paragraph--small paragraph--bold paragraph--no-spacing">Not a valid email</p>
                            ) : null}
                        </div>
                        <div className="login-view__input-form">
                            <p className="caption">Password</p>
                            <input
                                style={{
                                    border: errors.includes("password-no-match") ? 
                                    "2px solid #BB0101" : "1px solid black"
                                }} 
                                type="password" 
                                onChange={(event) => {
                                    setLoginPassword(event.target.value);
                                }}
                            ></input>
                            {errors.includes("password-no-match") ? (
                                <p className="paragraph paragraph--small paragraph--bold paragraph--no-spacing">Email or password is incorrect</p>
                            ) : null}
                        </div>
                        <Link className="link" to="/forgot">
                            <p className="caption caption--bold">Forgot password</p>
                        </Link>
                    </form>
                </div>
                <div className="login-view__buttons">
                    <button className="google-btn" onClick={loginWithGoogle}>
                        <img src={googleImg} alt="google" />
                    </button>
                    <button className="facebook-btn" onClick={loginWithFacebook}>
                        <img src={facebookImg} alt="facebook" />
                    </button>
                    <button disabled={disabled} className="login-btn" onClick={loginWithCredentials} type="submit">Login</button>
                </div>
            </article>
            <ToggleInfo toggleText="You need to type in your email and password to log in" />
        </React.Fragment>
    );
}
export default LoginView;