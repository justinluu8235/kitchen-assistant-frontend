import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                {/* <Link className="navbar-brand" to="/">MERN Auth</Link> */}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="#navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
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
                                {/* <NavLink className="nav-link"  to="/profile">Profile</NavLink> */}
                            </li>
                            <li className="nav-item">
                                <span onClick={props.handleLogout} className="nav-link logout-link">Logout</span>
                            </li>
                        </ul>
                        : <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                {/* <NavLink className="nav-link"  to="/signup">Create Account</NavLink> */}
                            </li>
                            <li className="nav-item">
                                {/* <NavLink className="nav-link"  to="/login">Login</NavLink> */}
                            </li>
                          </ul>
                    }
                </div>
            </div>
        </nav>
    );
}

export default Navbar;