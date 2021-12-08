// @ts-nocheck
import React, { useState } from "react";
import { useHistory } from "react-router";
import { deleteUser, EmailAuthProvider, getAuth, reauthenticateWithCredential } from "firebase/auth";
import ConfirmDeletetion from "../../Components/HandleConfirm/confirmDeletetion";

const RemoveAccount: React.FC = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const history = useHistory()
    const [password, setPassword] = useState("")
    const credentials = EmailAuthProvider.credential(user.email, password);

    const handleRemoveAccount = async () => {
        deleteUser(user).then(() => {
            console.log("user deleted")
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div>
            <label>
                Password
                <input type="password" onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button onClick={() => history.goBack()}>Go back</button>
            <ConfirmDeletetion setConfirmed={handleRemoveAccount} />
        </div>
    )
}

export default RemoveAccount