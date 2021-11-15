// @ts-nocheck

import * as React from "react";
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
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    

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

    return (
        <>
            <article className="mainForm">
                <h2 className="header2">Signup</h2>
                <div className="formDiv">
                    <form className="form">
                        <div className="inputDiv">
                            <h3>Email</h3>
                            <input onChange={(event) => {setRegisterEmail(event.target.value);}}/>
                            <h3>Password</h3>
                            <input onChange={(event) => { setRegisterPassword(event.target.value);}}/>

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