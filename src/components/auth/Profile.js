import './Profile.css';
import React from 'react';
import { Link, Navigate} from 'react-router-dom';

const Profile = (props) => {
  
   const { handleLogout, user } = props;
   console.log("USER PROP", user)
 
   const {  username, email, exp } = user;
   const expirationTime = new Date(exp * 1000);
  //  const expirationTime = exp*1000
   let currentTime = Date.now();
    console.log('exp time', expirationTime)
    console.log('current time', currentTime)
    console.log('user', user)
   // make a condition that compares exp and current time
   if (currentTime >= expirationTime) {
       handleLogout();
       
       alert('Session has ended. Please login to continue.');
       window.location.href = '/login';
   }



   const userData = user ?
   (<div>
       <section>
       <div class="columns has-same-height is-gapless">
      <div class="column">
        <div class="card">
          <div class="card-content">
            <h3 class="title is-4">Profile</h3>

            <div class="content">
              <table class="table-profile">
                <tr>
                  <th colspan="1"></th>
                  <th colspan="2"></th>
                </tr>
                <tr>
                  <td>Email: {email}</td>
                </tr>   
                <tr>
                  <td>Account ID: {user.id}</td>
                </tr>
              </table>
            </div>
            <br/>
            
          </div>
        </div>
      </div>
      
    </div>
  </section>
   </div>) : <Navigate to="/login" />

    const errorDiv = () => {
        return (
            <div className="text-center pt-4">
                <h3>Please <Link to="/login">login</Link> to view this page</h3>
            </div>
        );
    };
    
    return (
        <div className="text-center pt-4">
            {user ? userData : errorDiv()}
        </div>
    );

}

export default Profile;