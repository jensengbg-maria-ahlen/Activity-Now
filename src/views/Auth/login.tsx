// @ts-nocheck
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, signInWithGoogle, signInWithFacebook } from '../../firebase-config'
import googleImg from '../../assets/google.png';
import facebookImg from '../../assets/facebook.png';
import ToggleInfo from "../../Components/ToggleInfo/toggleInfo";
import './_auth.scss';

const Login: React.FC = () => {
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPwd, setLoginPassword] = useState('')
    const [errors, setErrors] = useState([]);
    const [disabled, setDisabled] = useState(true);
    const history = useHistory()

    const loginWithCredentials = async () => {
        try {
            await signInWithEmailAndPassword(auth, loginEmail, loginPwd)
            history.push("/")
        } catch (error) {
            if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
                let validationErrors = [];
                validationErrors.push("password-no-match", "email-no-match");
                setErrors(validationErrors);
            }
        }
    }

    const validateEmail = (email) => {
        // eslint-disable-next-line
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
                <form className="login-view__form">
                    <div className="login-view__input-form">
                        <label className="caption caption--bold">
                            Email
                            <input
                                style={{
                                    border: errors.includes("email-not-valid" && "email-no-match") ?
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
                    </div>
                    <div className="login-view__input-form">
                        <label className="caption caption--bold">
                            Password
                            <input
                                style={{
                                    border: errors.includes("password-no-match") ?
                                        "2px solid #BB0101" : "1px solid black"
                                }}
                                type="password"
                                onChange={(event) => {
                                    setLoginPassword(event.target.value);
                                }}
                               
                               
                                onKeyDown={handleKeyDown}
                            />
                        </label>
                        {errors.includes("password-no-match") ? (
                            <p className="paragraph paragraph--small paragraph--bold paragraph--no-spacing">Email or password is incorrect</p>
                        ) : null}
                    </div>
                    <Link className="link" to="/forgot">
                        <p className="caption caption--bold caption--no-spacing">Forgot password</p>
                    </Link>
                </form>
                <div className="login-view__buttons">
                    <button className="google-btn" onClick={signInWithGoogle}>
                        <img src={googleImg} alt="google" />
                    </button>
                    <button className="facebook-btn" onClick={signInWithFacebook}>
                        <img src={facebookImg} alt="facebook" />
                    </button>
                    <button disabled={disabled} className="login-btn" onClick={loginWithCredentials} type="submit">Login</button>
                </div>
            </article>
            <ToggleInfo toggleText="You need to type in your email and password to log in" />
        </React.Fragment>
    );
}

export default Login;