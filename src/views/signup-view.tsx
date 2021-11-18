// @ts-nocheck
import React from "react";
import { useState } from "react";
import info from '../assets/info.png';
import google from '../assets/google.png';
import facebook from '../assets/facebook.png';
import '../Styles/_login-view.scss';


const SignupView: React.FC = () => {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [ confirmPassword, setConfirmPassword]  = useState("")

const handleSubmit = async () => {
if(password !== confirmPassword) {
    console.log("passoword does not match")
} else {
    console.log("password match!")
}
try {
    const login = await createUserWithEmailAndPassword(auth, email, password)
} catch (error) {
    console.log(error)
}
}
    return (
        <>
            <article className="mainForm">
                <h2 className="header2">Signup</h2>
                <h2>email</h2>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <h2>password</h2>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <h2>confirm password</h2>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <button onClick={handleSubmit}>Signup</button>
            </article>
        </>
    );
}
export default SignupView;