import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css'


const Navbar = (props) => {
    const { handleLogout, user } = props;
    const { id, username, email, exp } = user;
    console.log(username == null)

    return (
        <nav className="navbar navbar-expand-lg ">
            <div className="container nav-container">

                {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="#navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}
                <a class="navbar-item" href="/"> <h1 class="app-title">Kitchen Assistant</h1> </a>

                <div class="nav-auth-container">
                    {
                        props.isAuth
                            ? <div class="nav-auth-container">
                                    <div>
                                    <a className="nav-link" href="/profile/" style={{ color: "white" }}>Profile</a>
                                    </div>

                                    <div>
                                        <span onClick={props.handleLogout} className="nav-link logout-link" style={{ color: "white" }}>Logout</span>
                                    </div>
                                </div>
                                
                            : 
                                <div class="nav-auth-container">
                                    <a className="nav-link" href="/signup/" style={{ color: "white" }}>Create Account</a>
                                
                                
                                    <a className="nav-link" href="/login/" style={{ color: "white" }}>Login</a>
                                </div>
                              
                            
                    }
                    </div>

                <div class="nav-username">
                {username != null ? <p class="nav-text">Signed in as:  {username}</p> : null}
                </div>
               
                <div className="collapse navbar-collapse navbar-directory" id="navbarsExample07">
                   
                    
                    <div id="navbarMenu" class="navbar-menu">
                        <div class="navbar-end">
                            <a class="navbar-item" href="/recipes"> My Recipes </a>
                            <a class="navbar-item" href="/menu"> Menu </a>
                            <a class="navbar-item" href="/shoppingList"> Shopping List </a>
                            <a class="navbar-item" href="/pantry"> Pantry </a>
                            <a class="navbar-item" href="/searchRecipes"> Search Recipes </a>
                            <a class="navbar-item" href="/userFriends">
                                My Friends
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;