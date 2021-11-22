import { createContext, useContext, useState, useEffect } from "react"
import { auth } from "../firebase-config"
import { onAuthStateChanged } from 'firebase/auth'

export const AuthContext = createContext(auth);

export const useAuth = () => {
    const auth2 = useContext(AuthContext)
    return { ...auth2, isAuthenticated: auth2 != null }
}

export const Authentication = ({ children }: any ) => {
    const [currentUser, setCurrentUser] = useState(auth)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user: any) => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsub
    }, [currentUser, loading])


    return (
        <AuthContext.Provider value={currentUser}>
            {!loading && children}
        </AuthContext.Provider>
    )
}