
import './Login-1.css'
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
import { useEffect, useState, useRef } from "react";
const { REACT_APP_SERVER_URL } = process.env;

const Login = (props) => {
    const {nowCurrentUser, user} = props;
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)

    const handleUserName = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const getCookie = (name) => {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // at the beginning of a submit function
        const loginData = {
            username: username,
            password: password
        };

        let csrftoken = getCookie('csrftoken');
        console.log('csrftoken', csrftoken)
        fetch(`${REACT_APP_SERVER_URL}/login/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },

            body: JSON.stringify(loginData)

        })
            .then(response => response.json())
            .then((data) => {
                console.log("RETURN DATA:", data)
                let dataObj = JSON.parse(data)
                const { token } = dataObj;
                console.log('token', token)
                console.log('exp', dataObj['exp'])
                // save token to localStorage
                localStorage.setItem('jwtToken', token);
                // set token to headers
                setAuthToken(token);
                // decode token to get the user data
                const decoded = jwt_decode(token);
                console.log('decoded token', decoded)
                
                //  set the current user
                nowCurrentUser(decoded); // funnction passed down as props.
                setRedirect(true);
                return alert('Logged In');
            })
            .catch(error => {
                console.log('===> Error on login', error);
                alert('Either username or password is incorrect. Please try again');
            });
    };

    if (redirect) return (<Navigate to="/profile" />);
    
        return (
            <div>
                <section class="hero is-success is-fullheight">
                    <div class="hero-body">
                        <div class="container has-text-centered">
                            <div class="column is-4 is-offset-4">
                                <h3 class="title has-text-black">Login</h3>
                                <hr class="login-hr" />
                                <p class="subtitle has-text-black">Please login to proceed.</p>
                                <div class="box">
                                    <figure class="avatar">
                                        <img src="/images/login-icon.png" />
                                    </figure>
                                    <form onSubmit={handleSubmit.bind(this)}>
                                        <div class="field">
                                            <div class="control">
                                                <input class="input is-large" id="auth-email"
                                                    type="text" onChange={handleUserName.bind(this)}
                                                    placeholder="Your Email" value={username}
                                                    autocomplete="username" required />
                                            </div>
                                        </div>
                                        <div class="field">
                                            <div class="control">
                                                <input class="input is-large" id="auth-password"
                                                    type="password"
                                                    placeholder="**********"
                                                    autocomplete="current-password"
                                                    value={password}
                                                    onChange={handlePassword.bind(this)}
                                                    required />
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label class="checkbox">
                                                <input type="checkbox" />
                                                Remember me
                                            </label>
                                        </div>
                                        <button class="button is-block is-info is-large is-fullwidth">Login <i class="fa fa-sign-in" aria-hidden="true"></i></button>
                                    </form>
                                </div>
                                <p class="has-text-grey">
                                    <a href="/signup/">Sign Up</a> &nbsp;·&nbsp;
                                    {/* <a href="../">Forgot Password</a> &nbsp;·&nbsp;
                                <a href="../">Need Help?</a> */}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
   



}

export default Login;