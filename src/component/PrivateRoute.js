import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import ApplicationUtils from './../service/ApplicationUtils';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            <Component {...props} />
           // ApplicationUtils.isLogin(localStorage.getItem("user")) ?  : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;