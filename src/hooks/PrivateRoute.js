import { Route, Redirect } from "react-router-dom"
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