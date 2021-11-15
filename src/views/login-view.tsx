// @ts-nocheck
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import googleImg from '../assets/google.png';
import facebookImg from '../assets/facebook.png';
import '../Styles/_login-view.scss';
import { getAuth, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const LoginView: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPwd, setLoginPassword] = useState('')
    const [errors, setErrors] = useState([]);
    const auth = getAuth();
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

    const loginWithGoogle = ()  =>{
        signInWithPopup(auth, googleProvider).then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            const user = result.user;
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;

            // The email of the user's account used.
            const email = error.email;

            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
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
        <>
            <article className="mainForm">
                <div className="login-head">
                    <h2 className="header2">Login</h2>
                    <Link to="/signup">
                        <h5 className="signup">Sign up</h5>
                    </Link>
                </div>
                <div className="formDiv">
                    <p className="error"> {errorMessage} </p>
                    <form className="form" onSubmit={(e) => onLoginClicked(e)}>
                        <div className="inputDiv">
                            <h5>Email</h5>
                            <input 
                                type="email" 
                                className="inpName" 
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
                        <div className="inputDiv">
                            <h5>Password</h5>
                            <input type="password" className="inpName" onChange={(event) => {
                                setLoginPassword(event.target.value);
                            }} ></input>
                        </div>
                        <h5>Forgot password</h5>

                        <button className="loginBtn" onClick={loginWithCredentials} type="submit">Login</button>

                    </form>
                </div>

                <div className="google">
                    <img className="info" src={googleImg} alt="google" onClick={loginWithGoogle} />
                    <img className="info" src={facebookImg} alt="facebook" onClick={() => loginWithFacebook()} />
                </div>
            </article>
        </>
    );
}
export default LoginView;