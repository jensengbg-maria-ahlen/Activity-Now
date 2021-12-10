import { Route, Redirect } from "react-router-dom"
import { getAuth } from "@firebase/auth";
import { useAuth } from "./authentication"

export const PrivateRoute = ({component: Component, ...rest}) => {
    const { isAuthenticated } = useAuth();
    
    return (
        <Route 
            {...rest}
            render={routeProps => 
                isAuthenticated ? <Component {...routeProps} /> : 
                <Redirect to="/login" />}
        />
    )
}

export const SettingRoute = ({component: Component, ...rest}) => {
    const { isAuthenticated } = useAuth();
    const auth = getAuth();
    const user = auth.currentUser;
    const provider = user.providerData.map((id) => id.providerId)
    
    return (
        <Route 
            {...rest}
            render={routeProps => 
                isAuthenticated && provider[0] === "password" ? 
                <Component {...routeProps} /> : <Redirect to="/profile" />}
        />
    )
}