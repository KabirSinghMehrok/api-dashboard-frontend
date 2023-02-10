import React from 'react'
import ReactDOM from 'react-dom'
import {GoogleLogin} from 'react-google-login'

const clientId = "991312066352-4sh6kvg5rc91cbu54kn8hpclss7nlq39.apps.googleusercontent.com";

function LoginOAuth() {

    const onSuccess = (res) => {
        console.log("Login succesfull. Current user: ", res.profile)
    }

    const onFailure = (res) => {
        console.log("Login failed.", res.profile)
    }

    return (
        <div id="loginOAuthButton">
            <GoogleLogin
                clientId = {clientId}
                buttonText = "Login using Google"
                onSuccess = {onSuccess}
                onFailure = {onFailure}
                cookiePolicy = {'single host origin'}
                isSignedIn = {true}
            />
        </div>
    )
}

export default LoginOAuth();