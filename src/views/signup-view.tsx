// @ts-nocheck
import React from "react";
import { useState } from "react";
import info from '../assets/info.png';
import google from '../assets/google.png';
import facebook from '../assets/facebook.png';
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
        <>
            <article className="mainForm">
                <h2 className="header2">Signup</h2>
                <div className="formDiv">
                    <form className="form">
                        <div className="inputDiv">
                            <h5>Email</h5>
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

                            <h5>Password</h5>
                            <input type="password" onChange={(event) => { setRegisterPassword(event.target.value);}}/>

                            <button className="loginBtn" onClick={register}> Create User</button>
                        </div>
                        
                    </form>
                </div>
                <div className="google">
                    <img className="info" src={google} alt="google" />
                    <img className="info" src={facebook} alt="facebook" />
                </div>
                <div className="toggleDiv" onMouseEnter={() => setIsShown(true)}
                    onMouseLeave={() => setIsShown(false)}>
                    <img className="info" src={info} alt="info" />
                    {isShown && (
                        <p className="toggle">
                            info about activity today, stuff you agrre too when signing up
                        </p>
                    )}
                </div>
            </article>
        </>
    );
}
export default SignupView;