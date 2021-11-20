// @ts-nocheck
import {
    sendPasswordResetEmail
} from "firebase/auth";
import { auth } from '../firebase-config'
import {useState} from "react"

export default function ForgotPasswordPage() {

    const [loginEmail, setLoginEmail] = useState('')
    //forgotPass works ok
    const forgotPass = async () => {
        const sendMail = await sendPasswordResetEmail(auth, loginEmail)
        console.log(sendMail)
    }


    return (
        <>
            <form id='email'>
                <input
                    type="email"
                    onChange={(e) => {
                        setLoginEmail(e.target.value)
                    }} />
                <button onClick={forgotPass}>forgot password</button>
            </form>
        </>
    )
}