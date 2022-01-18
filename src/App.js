// Imports
import React, { useEffect, useState, Component } from 'react';
import { Route, Routes, BrowserRouter} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

// CSS
import './App.css';

// Components
import Signup from './components/Signup';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Profile from './components/Profile';

// const PrivateRoute = ({ component: Component, ...rest}) => {
//   let token = localStorage.getItem('jwtToken');
//   // console.log('===> Hitting a Private Route');
//   return <Route {...rest} render={(props) => {
//     return token ? <Component {...rest} {...props} /> : <Redirect to="/login"/>
//   }} />
// }


function App() {
  // Set state values
  const [currentUser, setCurrentUser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    let token;

    if (!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false);
      // console.log('====> Authenticated is now FALSE');
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'));
      setAuthToken(localStorage.getItem('jwtToken'));
      setCurrentUser(token);
    }
  }, []);

  const nowCurrentUser = (userData) => {
    // console.log('===> nowCurrentUser is here.');
    setCurrentUser(userData);
    setIsAuthenticated(true);
  }

  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
        // remove token for localStorage
        localStorage.removeItem('jwtToken');
        setCurrentUser(null);
        setIsAuthenticated(false);
    }
  }

  return (
    <div className="App">
      <Navbar handleLogout={handleLogout} isAuth={isAuthenticated} />
      <BrowserRouter>
      <div className="container mt-5">
        <Routes>
          <Route path='/signup' element={<Signup/>} />
          <Route 
            path="/login"
            element={<Login  nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} user={currentUser}/>}
          />
          <Route path="/profile" element={<Profile user={currentUser} handleLogout={handleLogout}/>}  />
          {/* <Route exact path="/" component={Welcome} />
          <Route path="/about" component={About} /> */}
        </Routes>
      </div>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
}

export default App;