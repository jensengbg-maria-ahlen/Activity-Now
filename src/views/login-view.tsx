
import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import google from '../assets/google.png';
import facebook from '../assets/facebook.png';
import '../Styles/_login-view.scss';

const LoginView: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState("");

  
    let onLoginClicked = async (formEvent: React.FormEvent) => {
      setErrorMessage(" ")
      formEvent.preventDefault();
      setErrorMessage('User does not exist');
    }

    return (
        <>
            <article className="mainForm">
                <div className="login-head">
                    <h2 className="header2">Loginn</h2>
                    <Link to="/signup">
                        <h5 className="signup">Sign up</h5>
                    </Link>
                </div>
                <div className="formDiv">
                <p className="error"> {errorMessage} </p>
                    <form className="form" onSubmit={(e) => onLoginClicked(e)}>
                        <div className="inputDiv">
                            <h5>Email</h5>
                            <input className="inpName" ></input>
                        </div>
                        <div className="inputDiv">
                            <h5>Password</h5>
                            <input className="inpName" ></input>
                        </div>
                        <h5>Forgot password</h5>
                        <button className="loginBtn" type="submit">Login</button>
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