// @ts-nocheck
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, signInWithGoogle, signInWithFacebook } from '../../firebase-config'
import googleImg from '../../assets/google.png';
import facebookImg from '../../assets/facebook.png';
import ToggleInfo from "../../Components/ToggleInfo/toggleInfo";
import './_auth.scss';

const Signup: React.FC = () => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [disabled, setDisabled] = useState(true);
    const history = useHistory();

    const validateEmail = (email) => {
        // eslint-disable-next-line
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
                await createUserWithEmailAndPassword(
                    auth,
                    registerEmail,
                    registerPassword
                );
                setDisabled(true)
                history.push("/profile")
            } catch (error) {
                if (error.code === "auth/weak-password") {
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
                <div className="login-view__content">
                    <div className="login-view__header">
                        <h1 className="title title--h1 title--bold">Signup</h1>
                        <Link className="link" to="/">
                            <p className="paragraph paragraph--small paragraph--bold paragraph--no-spacing">Login</p>
                        </Link>
                    </div>
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
                                    onKeyUp={(e) => {
                                        if (e.key === "Enter") {
                                            register()
                                        }
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
                    <div className="login-view__buttons">
                        <button className="google-btn" onClick={signInWithGoogle}>
                            <img src={googleImg} alt="google" />
                        </button>
                        <button className="facebook-btn" onClick={signInWithFacebook}>
                            <img src={facebookImg} alt="facebook" />
                        </button>
                        <button disabled={disabled} className="create-btn" onClick={register}> Create User</button>
                    </div>
                </div>
            </article>
            <ToggleInfo toggleText="Activity Today takes no responsibility for what happens on the activities. Please only go to safe locations, and if put in danger, call 112! " />
        </React.Fragment>
    );
}
export default Signup;