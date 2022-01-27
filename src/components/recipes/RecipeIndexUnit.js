import React from 'react';
import RecipeIndex from './RecipeIndex';

const RecipeIndexUnit = (props) => {
        const {recipeName, id, image} = props

    return (

        <div v-for="card in cardData" key="card.id" class="column is-4">
            {/* <% for( let i = 0; i < allRecipes.length; i++ ) { %> 
              <% let recipe = allRecipes[i].toJSON() %> */}
            <div class="card large">
             
                <div class="card-image" class="recipe-image">
                    <figure class="image is-16by9">
                        <img src={image ? image : ""}  />
                    </figure>
                </div>
 
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-4 no-padding">{recipeName} </p>
                            <br />
                            <p>
                                <span class="title is-6">
                                    <a href={`/recipes/${id}`}>View Recipe</a> </span> </p>
                            <br /><br />
                            <p>
                                <span class="title is-6">
                                    <form action="/recipes/<%=recipe.id%>" method="POST">
                                        <input type="submit" value="Add Ingredients to Shopping List" />
                                    </form> </span> </p>
                            <p>
                                <br />
                                <span class="title is-6">
                                    <form action="/menu/<%=recipe.id%>" method="POST">
                                        {/* <% if(recipe.imageURL != null){ %>  */}
                                        <input type="text" name="imageURL" value="<%=recipe.imageURL %>" hidden />
                                        {/* //   <% } %>  */}
                                        <input type="date" name="dateSelected" />
                                        <input type="submit" value="Request" />
                                    </form> </span> </p>
                        </div>
                    </div>
                    <div class="content">
                    </div>
                </div>
            </div>
        </div>

    )
}

export default RecipeIndexUnit;