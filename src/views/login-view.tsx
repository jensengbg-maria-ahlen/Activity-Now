// @ts-nocheck
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import googleImg from '../assets/google.png';
import facebookImg from '../assets/facebook.png';
import '../Styles/_login-view.scss';
import {
    signInWithPopup,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider
} from "firebase/auth";
import { auth } from '../firebase-config'

const LoginView = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPwd, setLoginPassword] = useState('')
    const [errors, setErrors] = useState([]);
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();


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
                    <button className="google-btn" onClick={loginWithGoogle}>
                        <img src={googleImg} alt="google" />
                    </button>
                    <button className="facebook-btn" onClick={loginWithFacebook}>
                        <img src={facebookImg} alt="facebook" />
                    </button>
                    <button className="login-btn" onClick={loginWithCredentials} type="submit">Login</button>
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
export default LoginView;