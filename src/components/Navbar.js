import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg ">
            <div className="container">

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="#navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-item" href="/"> Kitchen Assistant </a>
                <div className="collapse navbar-collapse" id="navbarsExample07">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            {/* <NavLink className="nav-link" exact to="/">Home</NavLink> */}
                        </li>
                        <li className="nav-item">
                            {/* <NavLink className="nav-link"  to="/about">About</NavLink> */}
                        </li>
                    </ul>
                    {
                        props.isAuth
                            ? <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/profile/" style={{ color: "white" }}>Profile</a>
                                </li>
                                <li className="nav-item">
                                    <span onClick={props.handleLogout} className="nav-link logout-link" style={{ color: "white" }}>Logout</span>
                                </li>
                            </ul>
                            : <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/signup/" style={{ color: "white" }}>Create Account</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login/" style={{ color: "white" }}>Login</a>
                                </li>
                            </ul>
                    }
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