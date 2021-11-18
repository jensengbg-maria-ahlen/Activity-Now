// @ts-nocheck
import React from "react";
import { useState } from "react"
import {signInWithEmailAndPassword} from "firebase/auth"
import { auth } from "../firebase"
import { useHistory } from "react-router-dom"

const LoginView: React.FC = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory()

    const handleSubmit = async () => {
        if(!email || !password ) {
            console.log("empty feilds")
        }
        try {
            const signin = await signInWithEmailAndPassword(auth, email, password)
            console.log("login ok!")
            history.push("/landing")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div>
                <h1>login</h1>
                <h2>email</h2>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
   
            />
                <h2>password</h2>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleSubmit}>Login</button>
            </div>
        </>
    );
}
export default LoginView;