import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Cookies from "js-cookie";


const PrivateRoute = ({ component: Component, ...rest }) => {
    let loggedIn;
    if (Cookies.get("loggedIn") !== undefined) {
        loggedIn = true;
    } else {
        loggedIn = false;
    }

    return (
        <Route
            {...rest}
            render={props =>
                loggedIn ? (
                    <Component {...props} {...rest} />
                ) : (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )
            }
        />
    )
}

export default PrivateRoute;