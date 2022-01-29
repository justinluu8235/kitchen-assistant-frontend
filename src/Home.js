import React from 'react';
import './Home.css'

const Home = (props) => {
   

    return (
        <div class="container">
            <div class="section">
                <div class="columns">
                    <div class="column has-text-centered home-title-row">
                        <img class="kitch-icon-left" src="/img/kitchen-icon.png" alt="" />
                        <h1 class="title" style={{color: "#EBF2FA"}}>Welcome to the Kitchen!</h1>
                        <img class="kitch-icon-right" src="/img/kitchen-icon.png" alt="" />
                    </div>
                </div>
                <div id="app" class="row columns is-multiline">
                    <div v-for="card in cardData" key="card.id" class="column is-4">
                        <div class="card large">

                            <div class="card-content">
                                <div class="media">

                                    <div class="home-home-media-content">
                                        <p class="home-title is-4 no-padding"><a href="/menu" class="home-anchor">My Menu</a></p>

                                        <p>
                                            <span class="home-title-tet is-6">
                                                See what Recipes has been requested for you to make on what days.
                                                You can also use generate ingredidents to
                                                your shopping list from here!</span>
                                        </p>

                                    </div>
                                </div>
                                <div class="content">


                                </div>
                            </div>
                        </div>


                    </div>
                    <div v-for="card in cardData" key="card.id" class="column is-4">
                        <div class="card large">

                            <div class="card-content">
                                <div class="media">
                                    <div class="home-media-content">


                                        <p class="home-title is-4 no-padding"><a href="/recipes"  class="home-anchor">My Recipes</a></p>

                                        <p>
                                            <span class="home-title-text is-6">
                                                View all of your recipes! You can also generate ingredients to the shopping list from here.
                                            </span>
                                        </p>
                                      

                                    </div>
                                </div>
                                <div class="content">


                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-for="card in cardData" key="card.id" class="column is-4">
                        <div class="card large">

                            <div class="card-content">
                                <div class="media">
                                    <div class="home-media-content">
                                        <p class="home-title is-4 no-padding"><a href="/shoppingList" class="home-anchor" >My Shopping List</a></p>
                                       
                                        <p>
                                            <span class="home-title-text is-6">
                                                Manage your shopping list items here!
                                            </span>
                                        </p>
                            

                                    </div>
                                </div>
                                <div class="content">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-for="card in cardData" key="card.id" class="column is-4">
                        <div class="card large">

                            <div class="card-content">
                                <div class="media">
                                    <div class="home-media-content">
                                        <p class="home-title is-4 no-padding"><a href="/pantry" class="home-anchor" >My Pantry</a></p>
                                        <p>
                                            <span class="home-title-text is-6">
                                                Add items that you always have in your kitchen here! When auto-adding ingredients to the
                                                shopping list from recipes, these items will not be added. Indicate when pantry items are out of
                                                stock to add to shopping list
                                            </span>
                                        </p>
                                      

                                    </div>
                                </div>
                                <div class="content">
                                </div>
                            </div>
                        </div>
                    </div>


                    <div v-for="card in cardData" key="card.id" class="column is-4">
                        <div class="card large">

                            <div class="card-content">
                                <div class="media">
                                    <div class="home-media-content">
                                        <p class="home-title is-4 no-padding"><a href="/searchRecipes" class="home-anchor">Search Recipes</a></p>
                                        <p>
                                            <span class="home-title-text is-6">
                                                Don't have recipes of your own? Search for recipes online!
                                                You can save them to your own recipes and edit them if you like them.
                                            </span>
                                        </p>
                                     
                                    </div>
                                </div>
                                <div class="content">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-for="card in cardData" key="card.id" class="column is-4">
                        <div class="card large">

                            <div class="card-content">
                                <div class="media">
                                    <div class="home-media-content">
                                        <p class="home-title is-4 no-padding"><a href="/userFriends"  class="home-anchor">View and Request Friend's Recipes</a></p>
                                        <p>
                                            <span class="home-title-text is-6">
                                                Find your friends! View their recipes, and request them to make them, or add their recipes to your own

                                            </span>
                                        </p>
                                       
                                    </div>
                                </div>
                                <div class="content">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Home 
