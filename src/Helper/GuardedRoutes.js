import {Redirect, Route} from "react-router-dom";

/**
 * 
 *@description: Guarded Route component to redirect to login page if user is not logged in 
 */
const GuardedRoute = ({component: Component, auth, ...rest}) => {
    return (
        <Route {...rest} render={(props) => auth === true
        ? <Component {...props}/>
        : <Redirect to={{pathname: '/login'}}/>}/>
    );
}

export default GuardedRoute;
