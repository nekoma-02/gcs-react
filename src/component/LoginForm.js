import React from 'react'
import './LoginForm.css'
import { useForm } from 'react-hook-form'
import _ from "lodash/fp";
import ApplicationService from "../service/ApplicationService";
import ApplicationUtils from "../service/ApplicationUtils";
import {withRouter, useHistory} from 'react-router-dom'

const DEFAULT_QUERY_PARAMS = '?offset=0&limit=10';
const CERTIFICATES_PATH = '/certificates';
const USER = "user";
const JWT = "jwt";
const ERROR_ELEMENT = "#login-error p";

function LoginForm() {
    const history = useHistory();
    const {register, handleSubmit, errors} = useForm();

    const onSubmit = data => {
        let login = data.login;
        ApplicationUtils.clearElementText(ERROR_ELEMENT);

        ApplicationService.login(login, data.password)
            .then(
                response=>{
                    console.log('login '+ login + ' pass' + data.password + ' token ' + response.data.token);
                    localStorage.setItem(USER, login);
                    localStorage.setItem(JWT, response.data.token);
                    
                    history.push({pathname: CERTIFICATES_PATH, search: DEFAULT_QUERY_PARAMS});
                    
            }).catch((error)=>{
                ApplicationUtils.addTextToElement(ERROR_ELEMENT, error.response.errorMessage);
        });
    };

    return (
        <div id="form">
            <div id="login-photo"><p>Logo</p></div>
            <div id="login-form">
                <div id="login-error"><p className="error"></p></div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder="Login" name="login"
                           ref={register({ required: true, minLength:2, maxLength: 30})}/><br/>
                    {_.get("login.type", errors) === "required" && (
                        <p className="error">This field is required</p>
                    )}
                    {_.get("login.type", errors) === "minLength" && (
                        <p className="error">Login is too short, min length = 2</p>
                    )}
                    {_.get("login.type", errors) === "maxLength" && (
                        <p className="error">Login is too long, max length = 30</p>
                    )}
                    <input type="password" placeholder="Password" name="password"
                           ref={register({ required: true,  minLength:2, maxLength: 30})}/><br/>
                    {_.get("password.type", errors) === "required" && (
                        <p className="error">This field is required</p>
                    )}
                    {_.get("password.type", errors) === "minLength" && (
                        <p className="error">Password is too short, min length = 2</p>
                    )}
                    {_.get("password.type", errors) === "maxLength" && (
                        <p className="error">Password is too long, max length = 30</p>
                    )}
                   <input type="submit" id="login-submit"/>
                </form>
            </div>
        </div>
    );
}

export default withRouter(LoginForm)
