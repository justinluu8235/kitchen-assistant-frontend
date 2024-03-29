import "./Signup.css";

import React, { Component } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
const { REACT_APP_SERVER_URL } = process.env;

const errorMsg = (msg) => {

    const errorMsgStyle = {
        color: 'red'
    }
    return (
        <div style={errorMsgStyle}>
            {msg}
        </div>
    )
   }

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      redirect: false,
      errors: "",
    };
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

  handleConfirmPassword(e) {
    this.setState({
      confirmPassword: e.target.value,
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
    // make sure password and confirm password are equal
    // password length >= 8 characters
    console.log("INSIDE SIGNUP HANDLE SUBMIT")
    if (this.state.password === this.state.confirmPassword && this.state.password.length >= 8) {
      const newUser = {
        email: this.state.email,
        password: this.state.password,
      };

      let csrftoken = this.getCookie('csrftoken');
      fetch(`${REACT_APP_SERVER_URL}/signup/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'X-CSRFToken': csrftoken,
        },

        body: JSON.stringify(newUser)

      })
        .then(response => response.json())
        .then((data) => {
        console.log(data)
        const responseError = data?.errors
        if(responseError){
            this.setState({
               errors: responseError
            })
        }
        else{
          this.setState({
            redirect: true,
          });
          return alert('Account Created');
        }

        })

    } else {
      if (this.state.password !== this.state.confirmPassword)
        return alert("Passwords don't match");
      alert("Password needs to be at least 8 characters. Please try again.");
    }
  };

  render() {
    if (this.state.redirect) return <Navigate to="/login" />; // You can have them redirected to profile (your choice)

    return (
      <>
        <section className="container">
          <div className="columns is-multiline signup-container">
            <div className="column is-8 is-offset-2 register">
              <div className="columns signup">
                <div className="column left signup">
                  <h1 className="title is-1">Kitchen Assistant</h1>
                  <h2 className="subtitle colored is-4 signup">
                    Manage different tasks in your kitchen in one efficient way!
                  </h2>
                 
                </div>
                <div className="column right has-text-centered signup">
                  <h1 className="title is-4">Sign up today</h1>
                 
                  <form onSubmit={this.handleSubmit.bind(this)}>

                    <div className="field">
                      <div className="control">
                        <input
                          className="input is-medium"
                          type="email"
                          placeholder="Email"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleEmail.bind(this)}
                          required
                        />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <input
                          className="input is-medium"
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={this.state.password}
                          onChange={this.handlePassword.bind(this)}
                          required
                        />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <input
                          className="input is-medium"
                          type="password"
                          placeholder="Confirm Password"
                          name="confirmPassword"
                          value={this.state.confirmPassword}
                          onChange={this.handleConfirmPassword.bind(this)}
                          required
                        />
                      </div>
                    </div>

                    {this.state.errors !== "" && errorMsg(this.state.errors)}

                    <button type="submit" className="button is-block is-primary is-fullwidth is-medium">
                      Submit
                    </button>
                    <br />
                    <small>
                      
                    </small>
                  </form>
                </div>
              </div>
            </div>
            
          </div>
        </section>
      </>
    );
  }
}

export default Signup;