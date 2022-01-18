import './Profile.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Profile = (props) => {
   const { handleLogout, user } = props;
   const { id, name, email, exp } = user;
   const expirationTime = new Date(exp * 1000);
   let currentTime = Date.now();

   // make a condition that compares exp and current time
   if (currentTime >= expirationTime) {
       handleLogout();
       alert('Session has ended. Please login to continue.');
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
                  <td>Name: {name}</td>
                </tr>
                <tr>
                  <td>Email: {email}</td>
                </tr>   
                <tr>
                  <td>Account ID: {id}</td>
                </tr>
              </table>
            </div>
            <br/>
            <div class="buttons has-addons is-centered">
              <a href="#" class="button is-link">Github</a>
              <a href="#" class="button is-link">LinkedIn</a>
              <a href="#" class="button is-link">Twitter</a>
              <a href="#" class="button is-link">CodeTrace</a>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img src="https://source.unsplash.com/random/1280x960" alt="Placeholder image"/>
            </figure>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <div class="card-content skills-content">
            <h3 class="title is-4">Skills</h3>
            <div class="content">

              <article class="media">
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>JavaScript:</strong>
                      <br/>
                      <progress class="progress is-primary" value="90" max="100"></progress>
                    </p>
                  </div>
                </div>
              </article>

              <article class="media">
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>Vue.js:</strong>
                      <br/>
                      <progress class="progress is-primary" value="90" max="100"></progress>
                    </p>
                  </div>
                </div>
              </article>

              <article class="media">
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>Node.js:</strong>
                      <br/>
                      <progress class="progress is-primary" value="75" max="100"></progress>
                    </p>
                  </div>
                </div>
              </article>

              <article class="media">
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>HTML5/CSS3</strong>
                      <br/>
                      <progress class="progress is-primary" value="95" max="100"></progress>
                    </p>
                  </div>
                </div>
              </article>

              <article class="media">
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>Databases</strong>
                      <br/>
                      <progress class="progress is-primary" value="66" max="100"></progress>
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
   </div>) : <h2>Loading...</h2>

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