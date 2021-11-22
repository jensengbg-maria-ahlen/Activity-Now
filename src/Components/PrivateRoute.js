import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../hooks/authentication"

export const PrivateRoute = ({component: Component, ...rest}) => {
    const { isAuthenticated } = useAuth();
    
    return (
        <Route 
            {...rest}
            render={routeProps => 
                isAuthenticated ? <Component {...routeProps} /> : 
                <Redirect to="/" />}
        />
    )
}