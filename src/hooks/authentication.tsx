import React, { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from "../firebase-config"

export const AuthContext = createContext(auth);

export const useAuth = () => {
    const auth2 = useContext(AuthContext)
    return { ...auth2, isAuthenticated: auth2 != null }
}

export const Authentication: React.FC = ({ children }: any ) => {
    const [currentUser, setCurrentUser] = useState(auth)
    const [loading, setLoading] = useState(true)
    const history = useHistory()

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user: any) => {
            setCurrentUser(user)
            setLoading(false)
            if (user) {
                history.push("/") 
            } else {
                history.push("/login") 
            }            
        })

        return unsub
    }, [currentUser, loading])


    return (
        <AuthContext.Provider value={currentUser}>
            {!loading && children}
        </AuthContext.Provider>
    )
}