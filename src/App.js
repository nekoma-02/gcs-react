import React from 'react'
import LoginForm from "./component/LoginForm";
import Certificates from "./component/Certificates";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={LoginForm}/>
                    <PrivateRoute component={Certificates} path="/certificates" exact/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App
