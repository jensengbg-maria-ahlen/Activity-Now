import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import google from '../assets/google.png';
import facebook from '../assets/facebook.png';
import '../Styles/_login-view.scss';
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginView: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const  [loginEmail, setLoginEmail] = useState('')
    const  [loginPwd, setLoginPassword] = useState('')

    const login = async () => {
        try {
           const user = await signInWithEmailAndPassword(auth, loginEmail, loginPwd )
            console.log(user)
        }  catch(error) {
            console.log(error)
        }
    }

    let onLoginClicked = async (formEvent: React.FormEvent) => {
        setErrorMessage(" ")
        formEvent.preventDefault();
        setErrorMessage('User does not exist');
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
                            <input className="inpName"  onChange={(event) => {
            setLoginEmail(event.target.value);
          }} ></input>
                        </div>
                        <div className="inputDiv">
                            <h5>Password</h5>
                            <input className="inpName"   onChange={(event) => {
            setLoginPassword(event.target.value);
          }} ></input>
                        </div>
                        <h5>Forgot password</h5>
                        
                            <button className="loginBtn" onClick={login} type="submit">Login</button>
                        
                    </form>
                </div>

                <div className="google">
                    <img className="info" src={google} alt="google" />
                    <img className="info" src={facebook} alt="facebook" />
                </div>
            </article>
        </>
    );
}
export default LoginView;