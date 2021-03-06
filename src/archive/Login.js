import "./Login.css";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
const { REACT_APP_SERVER_URL } = process.env;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.getCookie = this.getCookie.bind(this)
  }

  handleEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handlePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  getCookie(name) {
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
  handleSubmit = (e) => {
    e.preventDefault(); // at the beginning of a submit function
    const loginData = {
      username: this.state.email,
      password: this.state.password
    };

    let csrftoken = this.getCookie('csrftoken');
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
        console.log("RETURN DATA:" , data)
        let dataObj = JSON.parse(data)
        const { token } = dataObj;
        console.log('token', token)
         // save token to localStorage
         localStorage.setItem('jwtToken', token);
         // set token to headers
         setAuthToken(token);
         // decode token to get the user data
         const decoded = jwt_decode(token);
         console.log('decoded token', decoded)
        //  set the current user
         this.props.nowCurrentUser(decoded); // funnction passed down as props.
        return alert('Logged In');
      })
      .catch(error => {
        console.log('===> Error on login', error);
        alert('Either email or password is incorrect. Please try again');
      });
  };

  render() {
    if (this.props.user) return <Navigate to="/profile" />; // You can have them redirected to profile (your choice)

    return (
      <>
        <section id="login" className="hero is-fullheight">
          <div className="hero-body has-text-centered">
            <div className="login">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvZc2OTcmowp6dUbR_mwc_HPU5spYnvIwFSKyNdb1H1WrJUpEWJlDu-4q9rvgy7IrMfCc&usqp=CAU" width="325px" alt="logo" />
              <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="field">
                  <div className="control">
                    <input
                      className="input is-medium is-rounded"
                      type="text"
                      placeholder="hello@example.com"
                      autocomplete="username"
                      value={this.state.email}
                      onChange={this.handleEmail.bind(this)}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input is-medium is-rounded"
                      type="password"
                      placeholder="**********"
                      autocomplete="current-password"
                      value={this.state.password}
                      onChange={this.handlePassword.bind(this)}
                      required
                    />
                  </div>
                </div>
                <br />
                <button
                  className="button is-block is-fullwidth is-primary is-medium is-rounded"
                  type="submit"
                >
                  Login
                </button>
              </form>
              <br />
              <nav className="level">
                <div className="level-item has-text-centered">
                  <div>
                    <a href="#">Forgot Password?</a>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <a href="/signup">Create an Account</a>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Login;