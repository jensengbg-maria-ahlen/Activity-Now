
import * as React from "react";
import { useState } from "react";
import info from '../assets/info.png';
import google from '../assets/google.png';
import facebook from '../assets/facebook.png';
import '../Styles/_login-view.scss';

const SignupView: React.FC = () => {
    const [isShown, setIsShown] = useState(false);

    return (
        <>
            <article className="mainForm">
                <h2 className="header2">Signup</h2>
                <div className="formDiv">
                    <form className="form">
                        <div className="inputDiv">
                            <h5>Email</h5>
                            <input className="inpName" ></input>
                        </div>
                        <div className="inputDiv">
                            <h5>Username</h5>
                            <input className="inpName" ></input>
                        </div>
                        <div className="inputDiv">
                            <h5>Password</h5>
                            <input className="inpName" ></input>
                        </div>
                        <div className="inputDiv">
                            <h5>Confirm password</h5>
                            <input className="inpName" ></input>
                        </div>
                        <button className="loginBtn" type="submit">Submit</button>
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