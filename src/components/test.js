import React from 'react'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import facebookLogin from './Auth/Facebook';
import googleLogin from './Auth/Google';

const Main = () => {
    const responseFacebook = async (response) => {
        facebookLogin(response?.accessToken);
    };
    const responseGoogle = async (response) => {
        googleLogin(response?.accessToken)
        // facebookLogin(response?.accessToken);
    }
    return (
        <>
            <FacebookLogin
                appId="671703880810436"
                fields="name,email,picture"
                callback={responseFacebook}
                icon="fa-facebook" />
            <GoogleLogin
                clientId="150976157161-nrk87kqpr1i853kh8le4vdum95934mv4.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </>
    )
}

export default Main