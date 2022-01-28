// Imports
import React, { useEffect, useState, Component } from 'react';
import { Route, Routes, BrowserRouter} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

// CSS
import './App.css';
import axios from 'axios'

// Components
import Signup from './components/auth//Signup';
import Login from './components/auth/Login-1';
import Navbar from './components/Navbar';
import Profile from './components/auth/Profile';
import SearchRecipesIndex from './components/searchRecipes/SearchRecipesIndex'
import SearchRecipeShow from './components/searchRecipes/SearchRecipeShow';
import NewRecipe from './components/recipes/NewRecipe';
import ShowRecipe from './components/recipes/ShowRecipe';
import RecipeIndex from './components/recipes/RecipeIndex';
import EditRecipe from './components/recipes/EditRecipe';
import Pantry from './components/pantry/Pantry';
import ShoppingList from './components/shoppinglist/ShoppingList';
import Menu from './components/menu/Menu';
import UserFriend from './components/userFriend/UserFriend';
import FriendRecipeIndex from './components/userFriend/FriendRecipeIndex';
import FriendRecipeShow from './components/userFriend/FriendRecipeShow';
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
  const { REACT_APP_SERVER_URL } = process.env;

  useEffect(() => {
    let token;

    if (!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false);
      // console.log('====> Authenticated is now FALSE');
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'));
      setAuthToken(localStorage.getItem('jwtToken'));
      setCurrentUser(token);
      console.log(token);
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
    axios.get(`${REACT_APP_SERVER_URL}/logout`)

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
          <Route path="/searchRecipes" element={<SearchRecipesIndex user={currentUser} handleLogout={handleLogout}/>} />
          <Route path="/searchRecipe/view/:id" element={<SearchRecipeShow user={currentUser} handleLogout={handleLogout}/>}/>
          <Route path ="/recipes" element={<RecipeIndex user={currentUser} handleLogout={handleLogout}/>}/>
          <Route path="/recipes/new" element={<NewRecipe user={currentUser} handleLogout={handleLogout}/>}/>
          <Route path="/recipes/:id" element={<ShowRecipe user={currentUser} handleLogout={handleLogout}/>}/>
          <Route path="/recipes/edit/:id" element={<EditRecipe user={currentUser} handleLogout={handleLogout}/>}/>
          <Route path="/pantry" element={<Pantry user={currentUser} handleLogout={handleLogout}/>}/>
          <Route path="/shoppingList" element={<ShoppingList user={currentUser} handleLogout={handleLogout}/>}/>
          <Route path="/menu" element={<Menu user={currentUser} handleLogout={handleLogout}/>}/>
          <Route path="/userFriends" element={<UserFriend user={currentUser} handleLogout={handleLogout}/>}/>
          <Route path="/userFriends/recipes/:friendId" element={<FriendRecipeIndex user={currentUser} handleLogout={handleLogout}/>}/>
          <Route path="/userFriends/recipes/show/:recipeId" element={<FriendRecipeShow user={currentUser} handleLogout={handleLogout}/>}/>
        </Routes>
      </div>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
}

export default App;